import { Table, Flex, Text } from '@pega/cosmos-react-core';
import * as styles from './CustomMetric_styles.js';
const CustomMetric = props => {
  const { entry, currencysymbol, usersHeading, casesHeading } = props;
  const CustomStandardMetricEquivalent = entry.CustomPriceList.StandardMetricEquivalent;
  const CustomUsers = entry.CustomPriceList.Users ? entry.CustomPriceList.Users : '';
  const CustomCases = entry.CustomPriceList.Cases ? entry.CustomPriceList.Cases : '';
  const TableData = tableName => {
    const filterData = Object.values(tableName).filter(
      entry => entry.Quantity && entry.Quantity != ''
    );
    const data = Object.values(filterData).map(entry => {
      const Name = entry.Name ? entry.Name : '';
      const Quantity = entry.Quantity
        ? Number(entry.Quantity).toLocaleString('en-US', { maximumFractionDigits: 2 })
        : '';
      const CustomQuantity = entry.CustomQuantity
        ? Number(entry.CustomQuantity).toLocaleString('en-US', { maximumFractionDigits: 2 })
        : '';
      const LocalPrice = entry.LocalPrice
        ? Number(entry.LocalPrice).toLocaleString('en-US', { minimumFractionDigits: 5 })
        : '';
      const SubTotal = entry.SubTotal
        ? currencysymbol + Number(Math.round(entry.SubTotal)).toLocaleString()
        : '';
      const CustomSubtotal =
        entry.CustomSubtotal && entry.CustomSubtotal != 0
          ? currencysymbol + Number(Math.round(entry.CustomSubtotal)).toLocaleString()
          : '';
      return {
        Name,
        Quantity,
        CustomQuantity,
        LocalPrice,
        SubTotal,
        CustomSubtotal
      };
    });
    return data;
  };
  const BusinessOfficerJustification = () => {
    const BOJ = entry.CustomPriceList.BusinessOfficerJustification
      ? entry.CustomPriceList.BusinessOfficerJustification
      : '';
    return BOJ ? (
      <Flex container={{ direction: 'column' }} style={styles.card.metricDetails}>
        <Text variant='h4' style={styles.card.label}>
          Business officer justification
        </Text>
        <Text>{BOJ}</Text>
      </Flex>
    ) : (
      ''
    );
  };
  const usercolumns = [
    { renderer: 'Name', label: 'Metric', width: '20%' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '12%', align: 'right' },
    { renderer: 'Quantity', label: 'Unit quantity', width: '16%', align: 'right' },
    { renderer: 'SubTotal', label: 'Unit subtotal', width: '16%', align: 'right' },
    { renderer: 'CustomQuantity', label: 'Custom quantity', width: '16%', align: 'right' },
    { renderer: 'CustomSubtotal', label: 'Subtotal (monthly)', width: '20%', align: 'right' }
  ];
  const casecolumns = [
    { renderer: 'Name', label: 'Metric', width: '20%' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '12%', align: 'right' },
    { renderer: 'Quantity', label: 'Unit quantity', width: '16%', align: 'right' },
    { renderer: 'SubTotal', label: 'Unit subtotal', width: '16%', align: 'right' },
    { renderer: 'CustomQuantity', label: 'Custom quantity', width: '16%', align: 'right' },
    { renderer: 'CustomSubtotal', label: 'Custom subtotal (monthly)', width: '20%', align: 'right' }
  ];
  if (
    CustomStandardMetricEquivalent &&
    CustomStandardMetricEquivalent.includes('Users') &&
    CustomStandardMetricEquivalent &&
    CustomStandardMetricEquivalent.includes('Cases')
  ) {
    return (
      <Flex container={{ direction: 'column', rowGap: '2' }}>
        <Table title={usersHeading} columns={usercolumns} data={TableData(CustomUsers)}></Table>
        <Table title={casesHeading} columns={casecolumns} data={TableData(CustomCases)}></Table>
        {BusinessOfficerJustification()}
      </Flex>
    );
  } else if (CustomStandardMetricEquivalent && CustomStandardMetricEquivalent.includes('Cases')) {
    return (
      <>
        <Flex container={{ direction: 'column', rowGap: '2' }}>
          <Table title={casesHeading} columns={casecolumns} data={TableData(CustomCases)}></Table>
          {BusinessOfficerJustification()}
        </Flex>
      </>
    );
  } else if (CustomStandardMetricEquivalent && CustomStandardMetricEquivalent.includes('Users')) {
    return (
      <>
        <Flex container={{ direction: 'column', rowGap: '2' }}>
          <Table title={usersHeading} columns={usercolumns} data={TableData(CustomUsers)}></Table>
          {BusinessOfficerJustification()}
        </Flex>
      </>
    );
  } else '';
};
export default CustomMetric;
