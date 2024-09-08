//myNft deployed to:0xFdF2ed7A5D5dF976bbC44b102FFe59E90A965988

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract TransEth is IERC721Receiver {
    struct Listing {
        uint256 tokenId;
        uint256 price;
        address seller;
    }

    IERC721 public nftContract;
    mapping(uint256 => Listing) public listings;
    mapping(address => uint256) public sellerBalances;

    event NFTListed(
        uint256 indexed tokenId,
        uint256 price,
        address indexed seller
    );
    event NFTSold(
        uint256 indexed tokenId,
        uint256 price,
        address indexed buyer,
        address indexed seller
    );
    event FundsWithdrawn(address indexed seller, uint256 amount);

    constructor(address _nftContract) {
        require(_nftContract != address(0), "Invalid NFT contract address");
        nftContract = IERC721(_nftContract);
    }

    function listNFT(uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        require(
            nftContract.ownerOf(_tokenId) == msg.sender,
            "You are not the owner"
        );
        require(listings[_tokenId].price == 0, "NFT already listed");

        nftContract.safeTransferFrom(msg.sender, address(this), _tokenId);

        listings[_tokenId] = Listing({
            tokenId: _tokenId,
            price: _price,
            seller: msg.sender
        });

        emit NFTListed(_tokenId, _price, msg.sender);
    }

    function buyNFT(uint256 _tokenId) external payable {
        Listing memory listing = listings[_tokenId];
        require(listing.price > 0, "NFT not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");

        delete listings[_tokenId];

        nftContract.safeTransferFrom(address(this), msg.sender, _tokenId);

        sellerBalances[listing.seller] += msg.value;

        emit NFTSold(_tokenId, listing.price, msg.sender, listing.seller);
    }

    function withdrawFunds() external {
        uint256 amount = sellerBalances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        sellerBalances[msg.sender] = 0;

        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(msg.sender, amount);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    receive() external payable {}

    fallback() external payable {}
}
