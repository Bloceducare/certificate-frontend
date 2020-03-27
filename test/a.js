
const Cert = artifacts.require('Cert');
contract("Cert", accounts => {
  var accountA = accounts[0];

  it("should return accountA balance", async () => {

    const accountABalance = await web3.eth.getBalance(accountA);
	assert.equal(accountABalance, 99893781420000000000);
  });
});
