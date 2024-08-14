import { Bid } from "../../schema/bid.js";

const postBid = async (req, res) => {
  const { max, min, propertyId, bidder } = req.body;

  try {
    const newBid = new Bid({
      max,
      min,
      propertyId,
      bidder,
    });

    await newBid.save();
    res.status(201).json(newBid);
  } catch (error) {
    console.error("Error creating bid:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    console.error("Error retrieving bids:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBidById = async (req, res) => {
  const { id } = req.params;
  try {
    const bid = await Bid.findById(id);
    res.status(200).json(bid);
  } catch (error) {
    console.error("Error retrieving bids:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { postBid, getBids, getBidById };
