pragma solidity >=0.4.22 <0.9.0;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    uint public electionStarts = 1658598886192; // 2022-07-23
    uint public electionEnds = 1659301200000; // 2022-08-01
    uint public votingTime = 1 * 60; // 1 minute

    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 5");
    }

    function addCandidate (string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;

        emit votedEvent(_candidateId);
    }
}