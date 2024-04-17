import { useState, useEffect } from 'react';
import { MenuButton, registerIcon, Button, Icon } from '@pega/cosmos-react-core';
import * as plus from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon.js';
registerIcon(plus);

const CreateProduct = props => {
  const { getPConnect, EnvGroupID, OfferID, isVisible, onclickEdit } = props;
  const subscribe = () => {
    PCore.getPubSubUtils().subscribeOnce(
      PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.CREATE_STAGE_DONE,
      onclickEdit,
      'RefreshPage'
    );
  };

  const Productcase = async () => {
    try {
      const optionsForProduct = {
        flowType: 'pyStartCase',
        openCaseViewAfterCreate: false,
        containerName: 'primary',
        startingFields: {
          EnvironmentGroupID: EnvGroupID,
          OfferID: OfferID
        }
      };
      await getPConnect().getActionsApi().createWork('PEGAIT-CFG-Work-Product', optionsForProduct);
    } catch (error) {
      console.error('Error creating case:', error);
    } finally {
      subscribe();
    }
  };

  return (
    <div style={{ display: isVisible === true ? 'inline' : 'none' }}>
      <Button
        style={{ float: 'right' }}
        variant='simple'
        label='Add product'
        icon
        compact={true}
        onClick={() => Productcase()}
      >
        <Icon name='plus' />
      </Button>
      <div style={{ visibility: 'hidden' }}>test</div>
    </div>
  );
};

export default CreateProduct;
