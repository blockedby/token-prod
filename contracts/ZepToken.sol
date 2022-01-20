//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
//contract and interface are fully satisfied by https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

interface IERC20 {
    // getters
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    // functions
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ERC20 is IERC20 {
  mapping (address => uint256) private _balances;
  // можно разрешить только одному контракту, ай йай
  mapping (address => mapping (address => uint256)) private _allowed;

  string private _name = "KCNCtoken";
  string private _symbol = "KCNC";
  uint private _decimals = 18;
  uint256 private _totalSupply;
  address private _owner;

  error Unauthorized();

  constructor(){
    _owner = msg.sender;
  }

  modifier onlyBy(address _account)
  {
    if (msg.sender != _account)
      revert Unauthorized();
    _;
  }
  

  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }

  function name() public view returns (string memory){
    return _name;
  }

  function decimals() public view returns (uint){
    return _decimals;
  }

  function symbol() public view returns (string memory){
    return _symbol;
  }

  function balanceOf(address owner) public view override returns (uint256) {
    return _balances[owner];
  }

  function allowance(address owner,address spender) public view override returns (uint256)
  {
    return _allowed[owner][spender];
  }

  function transfer(address to, uint256 value) public override returns (bool) {
    require(value <= _balances[msg.sender], "Balance less then value");
    require(to != address(0),"'To' can't be zero");

    _balances[msg.sender] -= value;
    _balances[to] += value;
    emit Transfer(msg.sender, to, value);
    return true;
  }

  function approve(address spender, uint256 value) public override returns (bool) {
    require(spender != address(0),"'Spender' can't be zero");

    _allowed[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }

  function transferFrom(address from, address to, uint256 value) public override returns (bool){
    require(value <= _balances[from],"Balance less then value");
    require(value <= _allowed[from][msg.sender],"Anauthorised, please approve");
    require(to != address(0),"'To' can't be zero");

    _balances[from] -= value;
    _balances[to] += value;
    _allowed[from][msg.sender] -= value;
    emit Transfer(from, to, value);
    return true;
  }

  function increaseAllowance(address spender,uint256 addedValue) public returns (bool){
    require(spender != address(0),"'Spender' can't be zero");

    _allowed[msg.sender][spender] += addedValue;
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool){
    require(spender != address(0),"'Spender' can't be zero");

    _allowed[msg.sender][spender] -= subtractedValue;
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  function mint(address account, uint256 amount) public onlyBy(_owner){
    require(account != address(0),"Account can't be zero");
    _totalSupply += amount;
    _balances[account] += amount;
    emit Transfer(address(0), account, amount);
  }

  function burn(address account, uint256 amount) public onlyBy(_owner) {
    require(account != address(0),"Account can't be zero");
    require(amount <= _balances[account],"You don't have such amount");

    _totalSupply -= amount;
    _balances[account] -= amount;
    emit Transfer(account, address(0), amount);
  }

  function burnFrom(address account, uint256 amount) public onlyBy(_owner) {
    require(amount <= _allowed[account][msg.sender],"Account doesn't own such amount");

    _allowed[account][msg.sender] -= amount;
    burn(account, amount);
  }
}