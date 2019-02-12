const staticUrl = '/assets/'; //'http://localhost:8080/static/';
const elasticUrl = 'http://localhost:9200/';
const urlDefs = {
  search: index => elasticUrl + index +'/_msearch?',
};

/**
 * Helper class to get Url's for all API calls
 * {@link http://pragmatic-backbone.com/models-collections-and-data}
 * @author  {@link http://kartoteket.as/team/bard.html Bård Røtzer}
 * @param {String} type       - the type of method to get
 * @param {Mixed}  optional   - All other parameters, just passed on
 */
export default function(type) {
  return urlDefs[type]
    ? urlDefs[type].apply(this, [].slice.call(arguments, 1))
    : undefined;
}
