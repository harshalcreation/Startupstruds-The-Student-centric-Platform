const Listing = require("../Modules/Listing.js");

module.exports.index = async (req, res) => {
	const allListings = await Listing.find({});
	res.render("listings/index.ejs", { allListings });
}

module.exports.show = async (req, res) => {
	const { id } = req.params;
	const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
	if(!listing){
		req.flash("error","Startup not found not found");
		res.redirect("/listings");
	}
	else{
		res.render("listings/show.ejs", { listing });
	}
};

module.exports.newListing = async (req, res) => {
	let url = req.file.path;
	let filename = req.file.filename;
	// Extract the listing data from the request body
	const data = req.body.listing;
	// Create a new Listing instance with the extracted data
	let newlisting = new Listing(data);
	newlisting.owner = req.user._id;
	newlisting.image = { filename, url};	
	// Save the new listing to the database
	await newlisting.save();
	req.flash("success","Startup added!");
	// Redirect the client to the /listings route after saving
	res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
	const { id } = req.params;
	const listing = await Listing.findById(id);
	if(!listing){
		req.flash("error","Startup details you requested does not exits!");
		req.redirect("/listings");
	}
	OrignalUrl = listing.image.url.replace("/upload","/upload/h_50,w_50/e_blur:50");
	res.render("listings/edit.ejs", { listing , OrignalUrl });
};

module.exports.dbUpdate = async (req, res) => {
	const { id } = req.params;
	let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruction listing[ keys ]
	if( typeof req.file !== "undefined"){
		let url = req.file.path;
		let filename = req.file.filename;
		listing.image = { filename, url};	
		await listing.save();
	}
	req.flash("success","Your Startup details updated!"); 
	res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
	const { id } = req.params;
	const deletedListing = await Listing.findByIdAndDelete(id);
	req.flash("error","Startup has been deleted from database!");
	// console.log(deletedListing);
	res.redirect("/listings");
}
module.exports.raise=async(req,res)=>{
	const{id}=req.params;
	const externalURL = `https://externalwebsite.com/page?id=${id}`;
    res.redirect(externalURL);
	
}