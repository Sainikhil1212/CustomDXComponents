import { Flex, Text } from '@pega/cosmos-react-core';
import Metrics from './ProductContent.js';
import * as styles from './Addon_styles.js';
const Addon = props => {
  const { Addon, currencysymbol } = props;
  const FilterAddon = Addon ? Object.values(Addon).filter(entry => entry.pySelected === true) : '';
  return (
    <div>
      {FilterAddon && FilterAddon.length > 0 ? (
        <Flex container>
          <Text variant='h1' style={styles.card.largemetricsHeader}>
            ADD-ONS
          </Text>
        </Flex>
      ) : (
        ''
      )}
      {FilterAddon && FilterAddon.length > 0
        ? FilterAddon.map(addon => (
            <div key={addon.CharacteristicName}>
              <Text variant='h3'>{addon.CharacteristicName}</Text>
              <Metrics entry={addon} currencysymbol={currencysymbol}></Metrics>
            </div>
          ))
        : ''}
    </div>
  );
};
export default Addon;
