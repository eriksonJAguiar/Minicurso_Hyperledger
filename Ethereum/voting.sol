pragma solidity ^0.5.2;

contract Election{
    struct Candidate{
        string name;
        uint voteCount;
    }

    struct Voter{
        bool authorized;
        bool voted;
        uint vote;
    }

    address public owner;
    string public electionName;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    uint public totalVotes;

    modifier ownerOnly(){
        require(msg.sender == owner, 'Sucesso');
        _;
    }

    constructor(string memory _name) public {
        owner = msg.sender;
        electionName = _name;
    }

    function addCandidate(string memory _name) ownerOnly public{
        candidates.push(Candidate(_name, 0));
    }

    function getNumCandidate() view public returns(uint) {
        return candidates.length;
    }

    function authorize(address _person) ownerOnly public {
        voters[_person].authorized = true;
    }

    function vote(uint _voteIndex) public {
        require(!voters[msg.sender].voted, 'Vote');
        require(!voters[msg.sender].authorized == true, 'Vote athorized');

        voters[msg.sender].vote = _voteIndex;
        voters[msg.sender].voted = true;

        candidates[_voteIndex].voteCount += 1;
        totalVotes += 1;
    }

   /** function end() ownerOnly public{
        selfdestruct(owner);
    }
    */

}