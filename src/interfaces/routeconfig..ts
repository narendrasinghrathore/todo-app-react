export interface IRouteConfig {
  /**
   * path: It is same as goto, but we can add parameter / optional parameter
   * that will match on routing.
   * For example: path='/add/id?'
   * Here we can use goto: /add to navigate to url -> /add,
   * also we can pass /add/{some-id}, both will match to same component.
   */
  path: string;
  component: any;
  icon: any;
  label: string;
  value: string;
  goto: string;
}
