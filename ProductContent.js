import { Table, Flex, Text, Grid } from '@pega/cosmos-react-core';
import CustomMetric from './CustomMetric.js';
import * as styles from './ProductContent_styles.js';
const StandardMetrics = props => {
  const { entry, currencysymbol } = props;

  const PricingType = entry.PricingType;
  const IsUsers = PricingType && PricingType.includes('Users') ? true : false;
  const IsCases = PricingType && PricingType.includes('Cases') ? true : false;
  const IsGeneric = PricingType && PricingType.includes('Generic') ? true : false;
  const IsCustom = PricingType && PricingType.includes('Custom') ? true : false;
  const IsUsersandCases = IsCases && IsUsers;
  const IsNotPricedFeature = entry.PricedFeature === 'No' ? true : false;
  const CasesLicenseSchedule = () => {
    const CSL = entry.StandardPricelist.CasesLicenseSchedule
      ? entry.StandardPricelist.CasesLicenseSchedule
      : '';
    return CSL ? (
      <Flex container={{ direction: 'column' }} style={styles.card.metricDetails}>
        <Text variant='h4' style={styles.card.label}>
          What quantity/label will be in the license schedule?
        </Text>
        <Text variant='primary'>{CSL}</Text>
      </Flex>
    ) : (
      ''
    );
  };

  const UsersLicenseSchedule = () => {
    const USL = entry.StandardPricelist.UsersLicenseSchedule
      ? entry.StandardPricelist.UsersLicenseSchedule
      : '';
    return USL ? (
      <Flex container={{ direction: 'column' }} style={styles.card.metricDetails}>
        <Text variant='h4' style={styles.card.label}>
          What quantity/label will be in the license schedule?
        </Text>
        <Text variant='primary'>{USL}</Text>
      </Flex>
    ) : (
      ''
    );
  };
  const BusinessOfficerJustification = () => {
    const BOJ = entry.StandardPricelist.BusinessOfficerJustification
      ? entry.StandardPricelist.BusinessOfficerJustification
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

  const Users =
    IsUsers === true && entry.StandardPricelist.Users && entry.StandardPricelist.Users.length
      ? entry.StandardPricelist.Users
      : false;

  const Cases =
    IsCases === true && entry.StandardPricelist.Cases && entry.StandardPricelist.Cases.length
      ? entry.StandardPricelist.Cases
      : false;

  const Variable =
    IsGeneric === true &&
    entry.StandardPricelist.RegularType &&
    entry.StandardPricelist.RegularType.length
      ? entry.StandardPricelist.RegularType
      : false;
  const Base =
    IsGeneric === true &&
    entry.StandardPricelist.BaseMetric &&
    entry.StandardPricelist.BaseMetric.length
      ? entry.StandardPricelist.BaseMetric
      : false;

  const Additional =
    IsGeneric === true &&
    entry.StandardPricelist.AdditonalMetric &&
    entry.StandardPricelist.AdditonalMetric.length
      ? entry.StandardPricelist.AdditonalMetric
      : false;

  const TableData = tableName => {
    const filterData = Object.values(tableName).filter(
      entry =>
        (entry.Quantity && entry.Quantity != '') ||
        (entry.DecimalQuantity && entry.DecimalQuantity != '') ||
        entry.pySelected == true
    );

    const data = Object.values(filterData).map(entry => {
      const Name = entry.Name ? entry.Name : '';
      const MetricName = entry.MetricName ? entry.MetricName : '';
      const Quantity = entry.Quantity
        ? Number(entry.Quantity).toLocaleString('en-US', {
            maximumFractionDigits: 2
          })
        : '';
      const DecimalQuantity = entry.DecimalQuantity
        ? Number(entry.DecimalQuantity).toLocaleString('en-US', {
            maximumFractionDigits: 2
          })
        : '';
      const LocalPrice = entry.LocalPrice
        ? Number(entry.LocalPrice).toLocaleString('en-US', {
            minimumFractionDigits: 5
          })
        : '';
      const QuantityPercentage = entry.QuantityPercentage ? entry.QuantityPercentage : '';
      const SubTotal =
        entry.SubTotal && entry.SubTotal != 0
          ? currencysymbol + Number(Math.round(entry.SubTotal)).toLocaleString()
          : '';

      return {
        Name,
        MetricName,
        Quantity,
        DecimalQuantity,
        LocalPrice,
        QuantityPercentage,
        SubTotal
      };
    });
    return data;
  };
  const TableResults = tableName => {
    const result = TableData(tableName).length > 0 ? true : false;
    return result;
  };
  const usersHeading = <Text variant='primary'>Users</Text>;
  const casesHeading = <Text variant='primary'>Annual cases</Text>;
  const Usercolumns = [
    ...(entry.StandardPricelist.IsBlendedUsers === true
      ? [{ renderer: 'Name', label: 'User type', width: '40%' }]
      : [{ renderer: 'Name', label: 'Metric', width: '40%' }]),
    { renderer: 'Quantity', label: 'Quantity', width: '20%', align: 'right' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '20%', align: 'right' },
    { renderer: 'SubTotal', label: 'Subtotal (monthly)', width: '20%', align: 'right' }
  ];
  const Casecolumns = [
    ...(entry.StandardPricelist.IsBlendedCases === true
      ? [{ renderer: 'Name', label: 'Case type', width: '40%' }]
      : [{ renderer: 'Name', label: 'Metric', width: '40%' }]),
    { renderer: 'Quantity', label: 'Quantity', width: '20%', align: 'right' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '20%', align: 'right' },
    { renderer: 'SubTotal', label: 'Subtotal (monthly)', width: '20%', align: 'right' }
  ];
  const columns = [
    { renderer: 'MetricName', label: 'Metric', width: '40%' },
    { renderer: 'DecimalQuantity', label: 'Quantity', width: '20%', align: 'right' },
    { renderer: 'LocalPrice', label: 'Unit price', width: '20%', align: 'right' },
    { renderer: 'SubTotal', label: 'Subtotal (monthly)', width: '20%', align: 'right' }
  ];

  if (IsUsersandCases) {
    return (
      <div>
        <div>
          <Table title={usersHeading} columns={Usercolumns} data={TableData(Users)}></Table>
          {UsersLicenseSchedule()}
        </div>
        <div>
          <Table title={casesHeading} columns={Casecolumns} data={TableData(Cases)}></Table>
          {CasesLicenseSchedule()}
        </div>
        {BusinessOfficerJustification()}
      </div>
    );
  } else if (Users) {
    return (
      <div>
        <Table title={usersHeading} columns={Usercolumns} data={TableData(Users)}></Table>
        {UsersLicenseSchedule()}
        {BusinessOfficerJustification()}
      </div>
    );
  } else if (Cases) {
    return (
      <div>
        <Table title={casesHeading} columns={Casecolumns} data={TableData(Cases)}></Table>
        {CasesLicenseSchedule()}
        {BusinessOfficerJustification()}
      </div>
    );
  } else if (IsGeneric) {
    return (
      <div>
        <div style={{ display: Base != false ? 'block' : 'none', paddingBottom: '1rem' }}>
          <Table columns={columns} data={TableData(Base)}></Table>
        </div>
        <div
          style={{
            display: Variable != false && TableResults(Variable) == true ? 'block' : 'none',
            paddingBottom: '1rem'
          }}
        >
          <Table columns={columns} data={TableData(Variable)}></Table>
        </div>
        <div
          style={{
            display: Additional != false && TableResults(Additional) == true ? 'block' : 'none',
            paddingBottom: '1rem'
          }}
        >
          <Table columns={columns} data={TableData(Additional)}></Table>
        </div>
      </div>
    );
  } else if (IsCustom) {
    return (
      <div>
        <div>
          <Text variant='h3' style={styles.card.custommetricsHeader}>
            Custom metric definition
          </Text>

          <Grid
            container={{
              cols: '175px 2fr 175px 2fr',
              rows: 'repeat(2, auto)',
              gap: '1'
            }}
          >
            <Grid item>
              <Text variant='h4' style={styles.card.label}>
                Custom metric name:
              </Text>
            </Grid>
            <Grid item>{entry.CustomPriceList.MetricName}</Grid>

            <Grid item>
              <Text variant='h4' style={styles.card.label}>
                Custom unit price:
              </Text>
            </Grid>
            <Grid item>
              {Number(entry.CustomPriceList.LocalPrice).toLocaleString('en-US', {
                minimumFractionDigits: 5
              })}
            </Grid>

            <Grid item>
              <Text variant='h4' style={styles.card.label}>
                Custom quantity:
              </Text>
            </Grid>
            <Grid item>
              {Number(entry.CustomPriceList.Quantity).toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}
            </Grid>

            <Grid item>
              <Text variant='h4' style={styles.card.label}>
                Custom total price:
              </Text>
            </Grid>
            <Grid item>
              {currencysymbol}
              {Number(Math.round(entry.CustomPriceList.SubTotal)).toLocaleString()}
            </Grid>
          </Grid>
        </div>
        <div style={{ paddingTop: '1rem' }}>
          <Text variant='h3' style={styles.card.metricsHeader}>
            Normalization: Conversion to standard metric
          </Text>
          <CustomMetric
            entry={entry}
            currencysymbol={currencysymbol}
            usersHeading={usersHeading}
            casesHeading={casesHeading}
          ></CustomMetric>
        </div>
      </div>
    );
  } else if (IsNotPricedFeature) {
    return <> {BusinessOfficerJustification()}</>;
  } else {
    return '';
  }
};
export default StandardMetrics;
