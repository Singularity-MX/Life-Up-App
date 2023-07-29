import React from 'react';
import QRCode from 'qrcode.react';

function QRGeneratorNew({ value }) {
  return (
    <div id='qr-container'>
      <QRCode value={value} className='qr' id='qr-canvas'/>
    </div>
  );
}

export default QRGeneratorNew;
