import { WorkTheme } from '@pega/cosmos-react-core';

export const card = {
  header: {
    alignItems: 'flex-start',
    backgroundColor: WorkTheme.base.colors.gray['extra-light'],
    padding: `calc(${WorkTheme.base.spacing} * 2)`
  },
  subHeader: {
    paddingLeft: `calc(${WorkTheme.base.spacing} * 3 )`
  },
  label: {
    color: WorkTheme.base.colors.black,
    opacity: WorkTheme.base.transparency['transparent-3'],
    marginRight: WorkTheme.base.spacing
  }
};
