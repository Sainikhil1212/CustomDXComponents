import PropTypes from 'prop-types';
import EnvGroupSummary from './EnvironmentGroup';

export default function PegaSalesAutomationOfferSummary(props) {
  const { getPConnect, OfferID } = props;
  return (
    <div>
      <EnvGroupSummary OfferID={OfferID} getPConnect={getPConnect}></EnvGroupSummary>
    </div>
  );
}

PegaSalesAutomationOfferSummary.defaultProps = {};

PegaSalesAutomationOfferSummary.propTypes = {
  getPConnect: PropTypes.func.isRequired
};
