export const CONTACT_ADDRESS = '0x22845B2c2dE506c8C27F62fD6714415635b36AF1';

export const CONTACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "contract ERC20Basic",
				"name": "_erc_20_address",
				"type": "address"
			},
			{
				"internalType": "contract ERC721Basic",
				"name": "_erc_721_adress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "candidateName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateVoteCount",
				"type": "uint256"
			}
		],
		"name": "createdCandidateEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "votedEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "politicalNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "economicalNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "socialNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "religousNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envFriendly",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yearsOfExperience",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "politicalNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "economicalNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "socialNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "religousNotion",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "envFriendly",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yearsOfExperience",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionEnds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionStarts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc_20",
		"outputs": [
			{
				"internalType": "contract ERC20Basic",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc_721",
		"outputs": [
			{
				"internalType": "contract ERC721Basic",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]