import { connect } from 'react-redux';

import Items from '../components/Items';
import { ApplicationState } from '../reducers';
import { receiveItems } from '../actions/items';

const mapStateToProps = ({ items }: ApplicationState) => ({
  items,
});

const mapDispatchToProps = {
  receiveItems,
};

const ItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Items);

export default ItemsContainer;
