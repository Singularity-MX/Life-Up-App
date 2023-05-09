import React from 'react';
import QRCode from 'qrcode.react';
import './buscarUserStyle.css'

function QRGenerator({ value }) {
  return (
    <div id='qr-container'>
      <QRCode value={value} className='qr' id='qr-canvas'/>
    </div>
  );
}

export default QRGenerator;
