// Home Controller

class Home{
    home(req,res){
        res.setHeader("Content-Type","text/html");
        return res.send("<h1>This is home</h1>");
       
    }
}

export default Home;