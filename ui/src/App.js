import { useEffect, useState } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from './ABI/Election.config';
import Web3 from 'web3';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './components/TabPanel';
import './App.css'
import CandidatesPage from './components/pages/candidatesPage/CandidatesPage';
import AddCandidate from './components/pages/addCandidatePage/AddCandidatePage';

function App() {
  const [account, setAccount] = useState();
  const [electionContract, setElectionContract] = useState();
  const [candidates, setCandidates] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setElectionContract(contract);
      const counter = await contract.methods.candidatesCount().call();

      let allCandidates = []
      for (let i=1; i<= counter; i++) {
        const candidate = await contract.methods.candidates(i).call();
        allCandidates.push({...candidate, voteCount: parseInt(candidate.voteCount)})
      }
      setCandidates(allCandidates);
    }

    load();
   }, []);
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  const onVote = async (candidateId) => {
    try {
      const voteResult = await electionContract.methods.vote(candidateId).send({from: account});
      if (voteResult && voteResult.status) {
        setCandidates(candidates.map(candidate => {
          return {
            ...candidate,
            voteCount: candidate.id === candidateId ? candidate.voteCount + 1 : candidate.voteCount
          }
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onAddCandidate = async ({candidateName}) => {
    try {
      const createResult = await electionContract.methods.addCandidate(candidateName).send({from: account});
      console.log(createResult)
      handleTabChange(0, 0)
    } catch (err) {
      console.error(err)
    }
  }

  const onCancelAddCandidate = async () => {
    handleTabChange(0, 0)
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
          onVote={onVote}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <AddCandidate 
          onSave={onAddCandidate}
          onCancel={onCancelAddCandidate}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <span>This is the third tab</span>
      </TabPanel>
    </div>
    
    </div>
  );
}

export default App;