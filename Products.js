import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  MenuButton,
  registerIcon,
  Flex,
  Text,
  ExpandCollapse,
  Button,
  Link,
  Icon
} from '@pega/cosmos-react-core';
import * as moreicon from '@pega/cosmos-react-core/lib/components/Icon/icons/more.icon.js';
import * as caretdown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon.js';
import * as caretright from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon.js';
import * as styles from './Products_styles.js';
import Addon from './Addon.js';
import Metrics from './ProductContent.js';
registerIcon(moreicon);
registerIcon(caretdown);
registerIcon(caretright);
const ProductList = props => {
  const { OfferID, getPConnect, Products, currencysymbol, onclickEdit, isVisible, envLabel } =
    props;
  const [products, setProducts] = useState([]);
  const [collapsedState, setCollapsedState] = useState({});
  const productCollapse = productid => {
    setCollapsedState(prevState => ({
      ...prevState,
      [productid]: !prevState[productid]
    }));
  };
  useEffect(() => {
    setProducts(Products);
  }, Products);
  const OfferKey = 'PEGASFA-WORK-OFFER ' + OfferID;
  const RemoveProduct = productkey => {
    getPConnect().getActionsApi().openLocalAction('RemoveProduct', {
      caseID: productkey,
      containerName: 'modal',
      type: 'case',
      name: 'Remove Product'
    });
  };
  const EditProduct = productkey => {
    getPConnect().getActionsApi().openLocalAction('Included', {
      caseID: productkey,
      type: 'case',
      containerName: 'modal',
      name: 'Edit Product Configuration'
    });
  };

  return (
    <div>
      <div>
        <div>
          {products &&
            products.map(product => (
              <Card style={{ border: '3px solid #F5F5F5', margin: '10px', borderRadius: '5px' }}>
                <CardHeader
                  style={styles.card.header}
                  actions={
                    <Flex container={{ alignItems: 'center' }}>
                      <Text variant='h4' status={undefined} style={styles.card.label}>
                        List price (monthly):
                      </Text>
                      {currencysymbol}
                      {Number(Math.round(product.EditionTotal)).toLocaleString()}{' '}
                      {isVisible && (
                        <MenuButton
                          portal
                          variant='simple'
                          text='Actions'
                          icon='more'
                          iconOnly
                          style={{}}
                          menu={{
                            items: [
                              {
                                id: 'EditProduct',
                                primary: 'Edit product',
                                onClick: () => EditProduct(product.pzInsKey)
                              },
                              {
                                id: 'RemoveProduct',
                                primary: 'Remove product',
                                onClick: () => RemoveProduct(product.pzInsKey)
                              }
                            ]
                          }}
                        />
                      )}
                    </Flex>
                  }
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      {collapsedState[product.pyID] ? (
                        <Button
                          variant='simple'
                          label='Expand'
                          icon
                          compact={true}
                          onClick={() => productCollapse(product.pyID)}
                        >
                          <Icon name='caret-right' />
                        </Button>
                      ) : (
                        <Button
                          variant='simple'
                          label='Collapse'
                          icon
                          compact={true}
                          onClick={() => productCollapse(product.pyID)}
                        >
                          <Icon name='caret-down' />
                        </Button>
                      )}
                      <div>
                        <Text variant='h2'>
                          {product.ProductInformation ? product.ProductInformation.ProductName : ''}
                        </Text>
                      </div>
                    </div>
                    <Text variant='h4' style={styles.card.subHeader}>
                      {product.EditionInformation.Name}
                    </Text>
                    {product.VerticalOffering && product.VerticalOffering.CharacteristicName ? (
                      <Flex container>
                        <Text
                          variant='h4'
                          style={{ ...styles.card.subHeader, ...styles.card.label }}
                        >
                          Vertical offering:
                        </Text>
                        {product.VerticalOffering.CharacteristicName}
                      </Flex>
                    ) : (
                      ''
                    )}
                  </div>
                </CardHeader>

                <ExpandCollapse
                  dimension='height'
                  collapsed={collapsedState[product.pyID]}
                  min={''}
                  max={''}
                  transitionSpeed='0.25s'
                  nullWhenCollapsed
                >
                  <CardContent>
                    {product.EditionInformation.IncludedList &&
                    product.EditionInformation.IncludedList.length &&
                    product.EditionInformation.IncludedList.length > 0 ? (
                      product.EditionInformation.IncludedList.map(included => (
                        <div key={included.CharacteristicName}>
                          <Metrics entry={included} currencysymbol={currencysymbol}></Metrics>
                        </div>
                      ))
                    ) : (
                      <p>No Metrics Available</p>
                    )}
                    {product.EditionInformation.AddonList &&
                    product.EditionInformation.AddonList.length &&
                    product.EditionInformation.AddonList.length > 0 ? (
                      <>
                        <Addon
                          Addon={product.EditionInformation.AddonList}
                          currencysymbol={currencysymbol}
                        ></Addon>
                      </>
                    ) : (
                      ''
                    )}
                  </CardContent>
                </ExpandCollapse>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
