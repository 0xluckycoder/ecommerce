import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Loading() {
  
    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 50
        }}
        spin
      />
    );
  
    return (
      <div className="loading-wrapper">
          <Spin className='loading' indicator={antIcon} />
      </div>
    );
}