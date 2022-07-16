import { useEffect, useState } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from './ABI/Election.config';
import Web3 from 'web3';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './components/TabPanel';
import './App.css'
import CandidatesPage from './components/pages/CandidatesPage';

function App() {
  const [account, setAccount] = useState();
  const [candidatesList, setCandidatesList] = useState();
  const [candidates, setCandidates] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const candidatesList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setCandidatesList(candidatesList);
      const counter = await candidatesList.methods.candidatesCount().call();

      let allCandidates = []
      for (let i=1; i<= counter; i++) {
        const candidate = await candidatesList.methods.candidates(i).call();
        allCandidates.push({...candidate})
      }
      setCandidates(allCandidates);
    }

    load();
   }, []);
  
  const handleTabChange = (event, newValue) => {
    console.log(newValue)
    setSelectedTab(newValue);
  }

  return (
    <div className='app'>
    <div className='header-container'>
      <AppBar position='static' className='app-bar-header'>
        <h1>Election Poll</h1>
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="#ffffff" indicatorColor='#ffffff' centered>
          <Tab label="All Candidates"/>
          <Tab label="Add Candidate"/>
          <Tab label="Results"/>
        </Tabs>
      </AppBar>
    </div>
    <div className='body-container'>
      <TabPanel value={selectedTab} index={0}>
        <CandidatesPage 
          allCandidates={candidates}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <span>This is the second tab</span>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <span>This is the third tab</span>
      </TabPanel>
    </div>
    
    </div>
  );
}

export default App;