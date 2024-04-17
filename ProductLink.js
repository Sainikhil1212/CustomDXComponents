import { useState, useEffect } from 'react';
import { Link, Flex, Text } from '@pega/cosmos-react-core';
const CaseObjectLink = props => {
  const { ProductID, ProductName, getPConnect } = props;
  const pyId = ProductID;
  const [objUrl, setObjUrl] = useState('');
  const [hasPreview, setHasPreview] = useState(false);
  const [pzInsKey, setPzInsKey] = useState('');
  var ObjectURL = '';
  const pzObjClass = 'PEGAIT-CFG-Work-Product';
  const pzInsClass = 'PEGAIT-CFG-WORK ';
  function setSemanticURL() {
    try {
      const semanticUrlUtils = PCore.getSemanticUrlUtils();
      const routeKey = semanticUrlUtils.getActions().ACTION_OPENWORKBYHANDLE;
      const payload = { caseClassName: pzObjClass };
      const params = { workID: pyId };
      ObjectURL = semanticUrlUtils.getResolvedSemanticURL(routeKey, payload, params);
      setHasPreview(true);
      setPzInsKey(pzInsClass + '' + pyId);
    } catch {
      ObjectURL = '';
      console.log('props:', props);
    }
    setObjUrl(ObjectURL);
  }
  useEffect(() => {
    setSemanticURL();
  }, [props]);
  return (
    <Link
      href={objUrl}
      variant='link'
      previewable={hasPreview}
      onPreview={() => {
        getPConnect().getActionsApi().showCasePreview(pzInsKey);
      }}
      onClick={() => {
        PCore.getMashupApi().openCase(pzInsKey);
      }}
    >
      <div
        style={{
          width: 'inherit',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          font: 'Open Sans'
        }}
      >
        <h3>{ProductName}</h3>
      </div>
    </Link>
  );
};
export default CaseObjectLink;
