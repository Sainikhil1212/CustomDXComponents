import { MenuButton, registerIcon, Button, Icon } from '@pega/cosmos-react-core';
import { useState, useEffect } from 'react';
import * as plus from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon.js';
registerIcon(plus);
const OfferActions = props => {
  const { OfferID, getPConnect, visible } = props;
  const OfferKey = 'PEGASFA-WORK-OFFER ' + OfferID;
  const [productList, setProductList] = useState([]);

  const AddProduct = () => {
    getPConnect().getActionsApi().openProcessAction('AddProduct', {
      caseID: OfferKey,
      type: 'Case',
      actionTitle: 'Add Product'
    });
  };
  const AddEnvGroup = () => {
    getPConnect().getActionsApi().openLocalAction('AddStacks', {
      caseID: OfferKey,
      containerName: 'modal',
      type: 'case',
      name: 'Add Environment group'
    });
  };

  return visible ? (
    <div>
      <Button
        style={{ float: 'right' }}
        variant='simple'
        label='Add environment group'
        icon
        compact={true}
        onClick={() => AddEnvGroup()}
      >
        <Icon name='plus' />
      </Button>
    </div>
  ) : (
    ''
  );
};
export default OfferActions;
