import { useState, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  registerIcon,
  Table,
  Flex,
  Text,
  ExpandCollapse,
  Button,
  Icon
} from '@pega/cosmos-react-core';
import * as moreicon from '@pega/cosmos-react-core/lib/components/Icon/icons/more.icon.js';
import * as caretdown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon.js';
import * as caretright from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon.js';
import * as styles from './CloudSize_styles.js';
registerIcon(moreicon);
registerIcon(caretdown);
registerIcon(caretright);
const CloudSize = props => {
  const { stack } = props;
  const [collapsed, setCollapsed] = useState(true);

  const createTableHeaders = (title, size) => {
    return (
      <>
        {title}
        <span style={{ marginLeft: '15px', fontSize: 'small', fontWeight: '200' }}>
          {size} results
        </span>
      </>
    );
  };

  const envColumns = [
    { renderer: 'name', label: 'Name', width: '80%' },
    { renderer: 'value', label: 'Quantity', align: 'right' }
  ];

  const envData = [
    {
      name: 'Standard Dev/Test sandbox',
      value: stack.StandardSandbox == null ? 0 : Number(stack.StandardSandbox).toLocaleString()
    },
    {
      name: 'Large Dev/Test/Pre-prod sandbox',
      value: stack.LargeSandbox == null ? 0 : Number(stack.LargeSandbox).toLocaleString()
    },
    {
      name: 'Production environment',
      value: stack.ProductionSandbox == null ? 0 : Number(stack.ProductionSandbox).toLocaleString()
    },
    {
      name: 'Production mirror sandbox',
      value:
        stack.ProductionMirrorSandbox == null
          ? 0
          : Number(stack.ProductionMirrorSandbox).toLocaleString()
    }
  ];
  const filteredenvData = Object.values(envData).filter(
    entry => entry.value && (entry.value > 0 || entry.value != '')
  );

  const envDataSize = filteredenvData.length > 0 ? filteredenvData.length : 0;
  const envTableHeader = createTableHeaders('Environments', envDataSize);

  const metricColumns = [
    { renderer: 'name', label: 'Cloud option', width: '80%' },
    { renderer: 'value', label: 'Size', align: 'right' }
  ];

  const storageData = [
    {
      name: 'Cloud data storage for production',
      value:
        stack.TotalCloudDataStorage == null
          ? 0 + ' GB'
          : Number(stack.TotalCloudDataStorage).toLocaleString() + ' GB'
    },
    {
      name: 'Cloud file storage',
      value:
        stack.TotalCloudFileStorage == null
          ? 0 + ' GB'
          : Number(stack.TotalCloudFileStorage).toLocaleString() + ' GB'
    }
  ];
  const storageDataSize = storageData.length > 0 ? storageData.length : 0;
  const storageTableHeader = createTableHeaders('Storage', storageDataSize);

  const decisioningData =
    stack.DecisioningMetrics &&
    stack.DecisioningMetrics.map(dm => ({
      title: dm.Title,
      data: [
        {
          name: 'Real-time decisions',
          value:
            dm.RealTimeDecisions == null
              ? 'Up to ' + 0 + ' DPS'
              : 'Up to ' + Number(dm.RealTimeDecisions).toLocaleString() + ' DPS'
        },
        {
          name: 'Batch/Bulk decisions',
          value:
            dm.BatchBulkDecisions == null
              ? 'Up to ' + 0
              : 'Up to ' + Number(dm.BatchBulkDecisions).toLocaleString()
        },
        {
          name: 'Streaming events',
          value:
            dm.StreamingEvents == null
              ? 'Up to ' + 0 + ' EPS'
              : 'Up to ' + Number(dm.StreamingEvents).toLocaleString() + ' EPS'
        },
        dm.pyLabel === 'BusinessOperations' || dm.pyLabel === 'ProductionMirror'
          ? {
              name: 'Cloud data storage',
              value:
                dm.CloudDataStorage == null
                  ? 0 + ' GB'
                  : Number(dm.CloudDataStorage).toLocaleString() + ' GB'
            }
          : '',
        {
          name: 'Decision data storage',
          value:
            dm.DecisionDataStorage == null
              ? 0 + ' GB'
              : Number(dm.DecisionDataStorage).toLocaleString() + ' GB'
        }
      ]
    }));

  const filteredData = () => {
    const filterData =
      decisioningData &&
      decisioningData.map(data => {
        const title = data.title;
        const values = Object.values(data.data).filter(entry => entry.name && entry.name != '');
        return { title, values };
      });
    return filterData;
  };
  const filteredDesicioningData = filteredData();

  return (
    <div>
      <div>
        <div>
          <Card style={{ border: '3px solid #F5F5F5', margin: '10px', borderRadius: '5px' }}>
            <CardHeader style={styles.card.header}>
              <div>
                <div style={{ display: 'flex' }}>
                  {collapsed ? (
                    <Button
                      variant='simple'
                      label='Expand'
                      icon
                      compact={true}
                      onClick={() => setCollapsed(curState => !curState)}
                    >
                      <Icon name='caret-right' />
                    </Button>
                  ) : (
                    <Button
                      variant='simple'
                      label='Collapse'
                      icon
                      compact={true}
                      onClick={() => setCollapsed(curState => !curState)}
                    >
                      <Icon name='caret-down' />
                    </Button>
                  )}

                  <div>
                    <Text variant='h2'>Cloud subscription entitlements</Text>
                  </div>
                </div>
              </div>
            </CardHeader>
            <ExpandCollapse
              dimension='height'
              collapsed={collapsed}
              min={''}
              max={''}
              transitionSpeed='0.25s'
              nullWhenCollapsed
            >
              <CardContent>
                <Table title={envTableHeader} columns={envColumns} data={filteredenvData} />
                <br />
                <Table title={storageTableHeader} columns={metricColumns} data={storageData} />
                <br />
                {filteredDesicioningData &&
                  filteredDesicioningData.map(m => (
                    <>
                      <Table
                        title={createTableHeaders(
                          m.title,
                          m.values.length && m.values.length > 0 ? m.values.length : 0
                        )}
                        columns={metricColumns}
                        data={m.values}
                      ></Table>
                      <br />
                    </>
                  ))}
              </CardContent>
            </ExpandCollapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CloudSize;
