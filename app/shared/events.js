
export const targetValue = (event) => event.target.value;

const preventDefaultEffect = (dispatch, props) => {
    props.event.preventDefault();
    dispatch(props.action);
};
const prevent = props => [preventDefaultEffect, props];
export const preventDefault = action => (state, event) => [
    state,
    prevent({ event, action })
];