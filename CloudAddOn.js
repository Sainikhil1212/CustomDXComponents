import { useState, useEffect } from 'react';
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
import * as styles from './CloudAddOn_styles.js';
registerIcon(moreicon);
registerIcon(caretdown);
registerIcon(caretright);
const CloudAddOns = props => {
  const { CloudOptions, TotalCloudOptions, currencysymbol } = props;
  const [collapsed, setCollapsed] = useState(true);

  const FilteredCloudOptions = CloudOptions
    ? CloudOptions.filter(entry => entry.TotalPrice > 0)
    : '';
  const CloudOptionsValue = FilteredCloudOptions ? FilteredCloudOptions : '';

  const columns = [
    { renderer: 'pyName', label: 'Name', width: '40%' },
    { renderer: 'pyTempText', label: 'Metric', width: '15%' },
    { renderer: 'Quantity', label: 'Quantity', width: '15%', align: 'right' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '15%', align: 'right' },
    { renderer: 'TotalPrice', label: 'Subtotal (monthly)', width: '15%', align: 'right' }
  ];

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

  const CloudOptionsSize = CloudOptionsValue.length > 0 ? CloudOptionsValue.length : 0;

  const cloudOptionsHeader = createTableHeaders('Cloud options', CloudOptionsSize);
  const TableData = tableName => {
    const data = Object.values(tableName).map(entry => {
      const pyName = entry.pyName ? entry.pyName : '';
      const Quantity = entry.Quantity
        ? Number(entry.Quantity).toLocaleString('en-US', {
            maximumFractionDigits: 2
          })
        : '';
      const pyTempText = entry.pyTempText ? entry.pyTempText : '';
      const LocalPrice = entry.LocalPrice
        ? Number(entry.LocalPrice).toLocaleString('en-US', {
            minimumFractionDigits: 5
          })
        : '';
      const TotalPrice =
        entry.TotalPrice && entry.TotalPrice > 0
          ? currencysymbol + Number(Math.round(entry.TotalPrice)).toLocaleString()
          : '';
      return {
        pyName,
        Quantity,
        pyTempText,
        LocalPrice,
        TotalPrice
      };
    });
    return data;
  };

  return (
    <div>
      <div>
        <div>
          <Card style={{ border: '3px solid #F5F5F5', margin: '10px', borderRadius: '5px' }}>
            <CardHeader style={styles.card.header}>
              <Flex container={{ alignItems: 'center' }}>
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

                <Text variant='h2'>Cloud add-ons</Text>
              </Flex>

              <Flex container={{ alignItems: 'center' }}>
                <Text variant='h4' status={undefined} style={styles.card.label}>
                  List price (monthly):
                </Text>
                {currencysymbol}
                {TotalCloudOptions > 0 ? Number(TotalCloudOptions).toLocaleString() : 0}
              </Flex>
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
                <Table
                  title={cloudOptionsHeader}
                  columns={columns}
                  data={TableData(CloudOptionsValue)}
                />
              </CardContent>
            </ExpandCollapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CloudAddOns;
