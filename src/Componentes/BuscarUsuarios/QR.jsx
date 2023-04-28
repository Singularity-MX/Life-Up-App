import React from 'react';
import QRCode from 'qrcode.react';

function QRGenerator({ value }) {
  return (
    <div>
      <QRCode value={value} />
    </div>
  );
}

export default QRGenerator;
