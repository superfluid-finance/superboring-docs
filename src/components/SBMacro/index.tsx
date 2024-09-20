import React, { useState } from 'react';
import { ethers } from 'ethers';

const MACRO_FORWARDER_ADDRESS = '0xfD01285b9435bc45C243E5e7F978E288B2912de6';
const SB_MACRO_ADDRESS = '0x383329703f346d72F4b86111a502daaa8f2c69C7'; // Example: Optimism Mainnet

const macroForwarderABI = [
  'function runMacro(address macro, bytes memory params) external',
];

const sbMacroABI = [
  'function getParams(address torexAddr, int96 flowRate, address distributor, address referrer, uint256 upgradeAmount) public pure returns (bytes memory)',
];

const SuperBoringDCAForm = () => {
  const [torexAddr, setTorexAddr] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [distributor, setDistributor] = useState('');
  const [referrer, setReferrer] = useState('');
  const [upgradeAmount, setUpgradeAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing...');

    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const macroForwarder = new ethers.Contract(MACRO_FORWARDER_ADDRESS, macroForwarderABI, signer);
      const sbMacro = new ethers.Contract(SB_MACRO_ADDRESS, sbMacroABI, provider);

      const flowRateBN = ethers.utils.parseEther(flowRate);
      const upgradeAmountBN = upgradeAmount === 'max' ? ethers.constants.MaxUint256 : ethers.utils.parseEther(upgradeAmount);

      const params = await sbMacro.getParams(
        torexAddr,
        flowRateBN,
        distributor || ethers.constants.AddressZero,
        referrer || ethers.constants.AddressZero,
        upgradeAmountBN
      );

      const tx = await macroForwarder.runMacro(SB_MACRO_ADDRESS, params);
      await tx.wait();

      setStatus('DCA position started successfully!');
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center' }}>Start SuperBoring DCA Position</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="torexAddr">Torex Address</label>
          <input
            type="text"
            id="torexAddr"
            value={torexAddr}
            onChange={(e) => setTorexAddr(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="flowRate">Flow Rate (in tokens per second)</label>
          <input
            type="text"
            id="flowRate"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="distributor">Distributor (optional)</label>
          <input
            type="text"
            id="distributor"
            value={distributor}
            onChange={(e) => setDistributor(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="referrer">Referrer (optional)</label>
          <input
            type="text"
            id="referrer"
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="upgradeAmount">Upgrade Amount (in tokens, or 'max')</label>
          <input
            type="text"
            id="upgradeAmount"
            value={upgradeAmount}
            onChange={(e) => setUpgradeAmount(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Start DCA Position
        </button>
      </form>
      {status && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Status:</strong> {status}
        </div>
      )}
    </div>
  );
};

export default SuperBoringDCAForm;