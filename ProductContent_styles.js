import { WorkTheme } from '@pega/cosmos-react-core';

export const card = {
  metricsHeader: {
    paddingTop: WorkTheme.base.spacing,
    paddingBottom: WorkTheme.base.spacing
  },
  custommetricsHeader: {
    paddingTop: WorkTheme.base.spacing,
    paddingBottom: WorkTheme.base.spacing,
    color: WorkTheme.base.colors.gray['extra-dark']
  },
  label: {
    color: WorkTheme.base.colors.black,
    opacity: WorkTheme.base.transparency['transparent-3'],
    marginRight: WorkTheme.base.spacing
  },
  metricDetails: {
    marginTop: `calc(${WorkTheme.base.spacing} * 2)`,
    marginBottom: `calc(${WorkTheme.base.spacing} * 2)`
  }
};
