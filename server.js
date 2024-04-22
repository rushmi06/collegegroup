const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const Message = require('./backend/Message'); 
const User = require('./backend/User');
const Admin = require('./backend/Admin');

const app = express();
const port = 3030;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/collegegroup');
app.get('/',(req,res)=>{
    res.send("Server is running")
})
app.post('/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({}); // Retrieve all messages from the database
        res.json(messages); // Send the messages as JSON response
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/filteredMessages/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { grad, branch, year, class: userClass } = user;
        const messages = await Message.find({
            'receivers.0':false,
            'receivers.1.grad': grad,
            'receivers.1.branches.branch': branch,
            'receivers.1.branches.years.year': year,
            'receivers.1.branches.years.classes': userClass
        });

        res.json(messages);
    } catch (error) {
        console.error("Error fetching filtered messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get('/filteredMessagesEvents/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { grad, branch, year, class: userClass } = user;
        const messages = await Message.find({
            'receivers.0':true,
            'receivers.1.grad': grad,
            'receivers.1.branches.branch': branch,
            'receivers.1.branches.years.year': year,
            'receivers.1.branches.years.classes': userClass
        });

        res.json(messages);
    } catch (error) {
        console.error("Error fetching filtered messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.post('/admins', async (req, res) => {
    try {
        const newUser = new Admin(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/sendOTP', async (req, res) => {
    const { to, subject, otp } = req.body;
    try {
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: '208x1a05a0@khitguntur.ac.in',
                pass: 'ipdc ddjw zmwq zvut'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: '"College group" <208x1a05a0@khitguntur.ac.in>',
            to: to,
            subject: subject,
            text: `Your OTP is: ${otp}`,
        });

        console.log("Message sent: %s", info.messageId);
        res.json(info);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "An error occurred while sending the email.", error });
    }
});

app.get('/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/admins/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await Admin.findOne({ email: email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/users', async (req, res) => {
    try {
        console.log(req.query);
        const users = await User.find(req.query);
        console.log(users)
        if (users.length > 0) { 
            res.json(users);
        } else {
            console.log("no user found")
            res.status(200).json([]);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/admins', async (req, res) => {
    try {
        const user = await Admin.find({ });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/messages', async (req, res) => {
    try {
        // Use deleteMany to delete all documents in the Message collection
        const result = await Message.deleteMany();

        res.json({ message: `${result.deletedCount} messages deleted successfully` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
app.delete('/messages/:id', async (req, res) => {
    try {
        const messageId = req.params.id;

        // Use deleteOne to delete the message with the specified ID
        const result = await Message.deleteOne({ _id: messageId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
