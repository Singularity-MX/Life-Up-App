import React from 'react';
import QRCode from 'qrcode.react';
import './buscarUserStyle.css'

function QRGenerator({ value }) {
  return (
    <div>
      <QRCode value={value} className='qr'/>
    </div>
  );
}

export default QRGenerator;
