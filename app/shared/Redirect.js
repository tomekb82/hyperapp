const redirectEffect = (dispatch, props) => {
  location.href = props.url;
};
export const Redirect = props => [redirectEffect, props];
