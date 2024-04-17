import {
  Card,
  CardContent,
  CardHeader,
  registerIcon,
  Icon,
  Button,
  Flex,
  MenuButton,
  Progress,
  Table,
  Text,
  ExpandCollapse
} from '@pega/cosmos-react-core';
import { useState, useEffect } from 'react';
import ProductsSummary from './Products.js';
import CloudAddOns from './CloudAddOn.js';
import CloudSize from './CloudSize.js';
import CreateProduct from './CreateProduct.js';
import OfferActions from './OfferActions.js';
import * as caretdown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon.js';
import * as caretright from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon.js';
import * as refresh from '@pega/cosmos-react-core/lib/components/Icon/icons/reset.icon.js';
import * as styles from './EnvironmentGroup_styles.js';
registerIcon(refresh);
registerIcon(caretdown);
registerIcon(caretright);
const EnvGroups = props => {
  const { OfferID, getPConnect, RefreshProp } = props;
  const [collapsedState, setCollapsedState] = useState({});
  const [stacklist, setStackList] = useState([]);
  const [status, setStatus] = useState('');
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currencytype, setCurrencyType] = useState('');
  const [resultcount, setResultCount] = useState(0);
  const OfferKey = 'PEGASFA-WORK-OFFER ' + OfferID;
  const constants = PCore.getConstants();
  const assignmentInfo = getPConnect().getValue(constants.CASE_INFO.ASSIGNMENTS);
  const assignmentID = assignmentInfo && assignmentInfo[0].actions[0].ID;
  const IsUpdateEnvironmentGroup = assignmentID === 'UpdateEnvironmentGroup';

  const fetchData = async () => {
    setVisible(true);
    try {
      const dataViewName = 'D_StackListByOffer';
      const payload = {
        dataViewParameters: {
          OfferID: OfferKey
        }
      };
      const context = 'app/primary_1';

      const response = await PCore.getDataApiUtils().getData(dataViewName, payload, context);

      if (response.data.data !== null) {
        setStackList(response.data.data);
        setCurrencyType(response.data.data[0].CurrencyType);
        setStatus(response.data.data[0].pyTempText);
        setResultCount(response.data.resultCount);
        console.log(response);
        setVisible(curstate => !curstate);
      } else {
        setStackList([]);
        console.log('No data available');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };
  const isVisible = status === 'DRAFT' ? true : false;
  const subscribe = () => {
    PCore.getPubSubUtils().subscribeOnce(
      PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING,
      fetchData,
      'RefreshDataPage'
    );
  };
  const EnvGrpCount = stacklist && stacklist.length ? stacklist.length : 0;
  const unsubscribe = () => {
    PCore.getPubSubUtils().unsubscribe(
      PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING,
      'RefreshDataPage'
    );
  };
  isVisible === true ? subscribe() : unsubscribe();
  useEffect(() => {
    fetchData();
  }, [OfferID, value]);
  const getSymbol = currency => {
    const symbol = new Intl.NumberFormat('en', { style: 'currency', currency })
      .formatToParts('1')
      .find(x => x.type === 'currency');
    return symbol && symbol.value;
  };

  const currencysymbol = currencytype ? getSymbol(currencytype) : ' ';

  const EditEnvGroup = async StackID => {
    let modalContainer;
    await getPConnect()
      .getActionsApi()
      .openLocalAction('ManageStackSelection', {
        caseID: OfferKey,
        containerName: 'modal',
        type: 'case',
        name: 'Edit Environment group'
      })
      .then(() => {
        modalContainer = Object.keys(PCore.getContainerUtils().getContainerItems('app/modal'))[0];

        if (typeof modalContainer !== 'undefined') {
          PCore.getStore().dispatch({
            type: 'CLEAR_MESSAGES',
            payload: {
              context: modalContainer,
              type: 'error',
              property: '.ManageStackID',
              pageReference: 'caseInfo.content'
            }
          });

          PCore.getStore().dispatch({
            type: 'SET_PROPERTY',
            payload: {
              reference: 'caseInfo.content.ManageStackID',
              value: StackID,
              context: modalContainer,
              isArrayDeepMerge: true,
              skipDirtyValidation: false
            }
          });

          PCore.getStore().dispatch({
            type: 'FIELD_CHANGE',
            payload: {
              reference: 'caseInfo.content.ManageStackID',
              value: StackID,
              context: modalContainer,
              pageReference: 'caseInfo.content',
              propertyName: '@P .ManageStackID',
              classID: 'PegaSFA-Work-Offer'
            }
          });
        }
      });
  };
  const RemoveEnvGroup = async StackID => {
    let modalContainer;
    await getPConnect()
      .getActionsApi()
      .openLocalAction('RemoveEnvironmentGroup', {
        caseID: OfferKey,
        containerName: 'modal',
        type: 'case',
        name: 'Remove Environment group'
      })
      .then(() => {
        modalContainer = Object.keys(PCore.getContainerUtils().getContainerItems('app/modal'))[0];

        if (typeof modalContainer !== 'undefined') {
          PCore.getStore().dispatch({
            type: 'CLEAR_MESSAGES',
            payload: {
              context: modalContainer,
              type: 'error',
              property: '.ManageStackID',
              pageReference: 'caseInfo.content'
            }
          });

          PCore.getStore().dispatch({
            type: 'SET_PROPERTY',
            payload: {
              reference: 'caseInfo.content.ManageStackID',
              value: StackID,
              context: modalContainer,
              isArrayDeepMerge: true,
              skipDirtyValidation: false
            }
          });

          PCore.getStore().dispatch({
            type: 'FIELD_CHANGE',
            payload: {
              reference: 'caseInfo.content.ManageStackID',
              value: StackID,
              context: modalContainer,
              pageReference: 'caseInfo.content',
              propertyName: '@P .ManageStackID',
              classID: 'PegaSFA-Work-Offer'
            }
          });
        }
      });
  };
  const toggleCollapse = stackId => {
    setCollapsedState(prevState => ({
      ...prevState,
      [stackId]: !prevState[stackId]
    }));
  };
  return (
    <div>
      <div
        style={{
          display: isVisible === true && EnvGrpCount > 0 ? 'flex' : 'none',
          justifyContent: 'flex-end'
        }}
      >
        <OfferActions
          OfferID={OfferID}
          getPConnect={getPConnect}
          visible={!IsUpdateEnvironmentGroup}
        />
        <Button
          style={{ float: 'right' }}
          variant='simple'
          label='Refresh'
          icon
          compact={true}
          onClick={() => setValue(curval => curval + 1)}
        >
          <Icon name='reset' />
        </Button>
      </div>

      {visible ? (
        <div style={{ paddingTop: '40px' }}>
          <Progress
            variant='ring'
            message='Loading content'
            visible={visible}
            placement='block'
          ></Progress>
        </div>
      ) : (
        stacklist &&
        stacklist.map(stack => (
          <div>
            <Card key={stack.StackID} style={{ border: '3px solid #F5F5F5', margin: '10px' }}>
              <CardHeader
                style={styles.card.header}
                actions={
                  <div style={{ display: isVisible === true ? 'flex' : 'none', minHeight: '100%' }}>
                    <MenuButton
                      portal
                      variant='simple'
                      text='Actions'
                      icon='more'
                      iconOnly
                      menu={{
                        items: IsUpdateEnvironmentGroup
                          ? [
                              {
                                id: 'RemoveEnvironmentGroup',
                                primary: 'Remove environment group',
                                onClick: () => RemoveEnvGroup(stack.StackID)
                              }
                            ]
                          : [
                              {
                                id: 'EditEnvironmentGroup',
                                primary: 'Edit environment group',
                                onClick: () => EditEnvGroup(stack.StackID)
                              },
                              {
                                id: 'RemoveEnvironmentGroup',
                                primary: 'Remove environment group',
                                onClick: () => RemoveEnvGroup(stack.StackID)
                              }
                            ]
                      }}
                    />
                  </div>
                }
              >
                <div>
                  <div>
                    <div style={{ display: 'flex' }}>
                      {collapsedState[stack.StackID] ? (
                        <Button
                          variant='simple'
                          label='Expand'
                          icon
                          compact={true}
                          onClick={() => toggleCollapse(stack.StackID)}
                        >
                          <Icon name='caret-right' />
                        </Button>
                      ) : (
                        <Button
                          variant='simple'
                          label='Collapse'
                          icon
                          compact={true}
                          onClick={() => toggleCollapse(stack.StackID)}
                        >
                          <Icon name='caret-down' />
                        </Button>
                      )}
                      <Text variant='h2'>{stack.StackName}</Text>
                    </div>
                    {stack.IsNew && (
                      <Flex container={{ gap: '1' }}>
                        <Flex item>
                          <Text variant='h4' style={styles.card.subHeader}>
                            Cloud provider:{' '}
                          </Text>
                        </Flex>
                        <Flex item>{stack.CloudProvider}</Flex>
                      </Flex>
                    )}
                    {stack.IsNew && (
                      <Flex container={{ gap: '1' }}>
                        <Flex item>
                          <Text variant='h4' style={styles.card.subHeader}>
                            Deployment region:{' '}
                          </Text>
                        </Flex>
                        <Flex item>{stack.DeploymentRegion}</Flex>
                      </Flex>
                    )}
                  </div>
                </div>
              </CardHeader>
              <ExpandCollapse
                dimension='height'
                collapsed={collapsedState[stack.StackID]}
                min={''}
                max={''}
                transitionSpeed='0.25s'
                nullWhenCollapsed
              >
                <CardContent>
                  <CreateProduct
                    getPConnect={getPConnect}
                    EnvGroupID={stack.StackID}
                    OfferID={OfferID}
                    onclickEdit={fetchData}
                    isVisible={isVisible}
                  ></CreateProduct>
                  <ProductsSummary
                    Products={stack.ProductListCR}
                    getPConnect={getPConnect}
                    currencysymbol={currencysymbol}
                    isVisible={isVisible}
                  ></ProductsSummary>
                  <CloudAddOns
                    CloudOptions={stack.CloudOptions}
                    TotalCloudOptions={stack.TotalCloudOptions}
                    currencysymbol={currencysymbol}
                  ></CloudAddOns>
                  <CloudSize stack={stack}></CloudSize>
                </CardContent>
              </ExpandCollapse>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};
export default EnvGroups;
