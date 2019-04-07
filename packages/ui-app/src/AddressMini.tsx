// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BareProps } from './types';

import BN from 'bn.js';
import React from 'react';
import { AccountId, AccountIndex, Address, Balance } from '@polkadot/types';

import { classes, toShortAddress } from './util';
import BalanceDisplay from './Balance';
import IdentityIcon from './IdentityIcon';

type Props = BareProps & {
  balance?: Balance | Array<Balance> | BN,
  children?: React.ReactNode,
  isPadded?: boolean,
  isShort?: boolean,
  value?: AccountId | AccountIndex | Address | string,
  withAddress?: boolean,
  withBalance?: boolean
};

export default class AddressMini extends React.PureComponent<Props> {
  render () {
    const { children, className, isPadded = true, style, value } = this.props;

    if (!value) {
      return null;
    }

    const address = value.toString();

    return (
      <div
        className={classes('ui--AddressMini', isPadded ? 'padded' : '', className)}
        style={style}
      >
        <div className='ui--AddressMini-info'>
          <IdentityIcon
            size={24}
            value={address}
          />
          {this.renderAddress(address)}
          {children}
        </div>
        {this.renderBalance()}
      </div>
    );
  }

  private renderAddress (address: string) {
    const { isShort = true, withAddress = true } = this.props;

    if (!withAddress) {
      return null;
    }

    return (
      <div className='ui--AddressMini-address'>{isShort ? toShortAddress(address) : address}</div>
    );
  }

  private renderBalance () {
    const { balance, value, withBalance = false } = this.props;

    if (!withBalance || !value) {
      return null;
    }

    return (
      <BalanceDisplay
        balance={balance}
        className='ui--AddressSummary-balance'
        value={value}
      />
    );
  }
}
