import Axios from 'axios';
import { map, isArray } from 'lodash';
import urls from '@/utils/urls';

export default class Queries {
  constructor(searchFields, categoryfield, index, preference) {
    if (isArray(searchFields)) {
      this.searchFields = '"' + searchFields.join('","') + '"';
    } else {
      this.searchFields = '"' + searchFields + '"';
    }

    this.categoryfield = categoryfield;
    this.preference = preference;
    this.index = index;

    this.config = {
      headers: {'Content-type': 'application/json'}
    }
  }

  assemble(term) {
    var query = term;
    var fields = this.searchFields;
    var prefs = this.preference;
    return `{"preference":"${prefs}"}\n{"query":{"bool":{"must":[{"bool":{"must":{"bool":{"should":[{"multi_match":{"query":"${query}","fields":[${fields}],"type":"best_fields","operator":"or","fuzziness":0}},{"multi_match":{"query":"${query}","fields":[${fields}],"type":"phrase_prefix","operator":"or"}}],"minimum_should_match":"1"}}}}]}},"size":20}\n`;
  }

  parse(result) {
    if (result.data.responses.length) {
      const r = result.data.responses[0].hits
      return map(r.hits, (hit) => {
        return hit._source;
      });
    }
    return [];
  }

  update(newTerm) {
    const query = this.assemble(newTerm);
    return Axios.post(urls('search', this.index), query, this.config)
    .then(result => {
      return this.parse(result);
    })
    .catch(err => {
      console.error(err);
    })
  }
}
