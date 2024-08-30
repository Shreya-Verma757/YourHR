const sampleUser = [
    {
        name: "John Doe",
        email: "john.doe@email.com",
        password: "hashedPassword123",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/john_doe_resume.pdf",
        location: "Mumbai, Maharashtra",
        country: "India",
    },
    {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        password: "hashedPassword456",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1508835277982-1c1b0e205603?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/jane_smith_resume.pdf",
        location: "São Paulo",
        country: "Brazil",
    },
    {
        name: "Michael Johnson",
        email: "michael.j@email.com",
        password: "hashedPassword789",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/michael_johnson_resume.pdf",
        location: "Tokyo",
        country: "Japan",
    },
    {
        name: "Emily Brown",
        email: "emily.brown@email.com",
        password: "hashedPasswordABC",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/emily_brown_resume.pdf",
        location: "Paris",
        country: "France",
    },
    {
        name: "David Lee",
        email: "david.lee@email.com",
        password: "hashedPasswordDEF",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1584940120743-8981ca35b012?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/david_lee_resume.pdf",
        location: "Berlin",
        country: "Germany",
    },
    {
        name: "Sarah Wilson",
        email: "sarah.w@email.com",
        password: "hashedPasswordGHI",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/sarah_wilson_resume.pdf",
        location: "Singapore",
        country: "Singapore",
    },
    {
        name: "Robert Taylor",
        email: "robert.t@email.com",
        password: "hashedPasswordJKL",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1555097074-b16ec85d6b3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/robert_taylor_resume.pdf",
        location:"Sydney, NSW" ,
        country: "Australia",
    },
    {
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
        password: "hashedPasswordMNO",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1592269780105-149d4445d356?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/lisa_anderson_resume.pdf",
        location: "Toronto, ON",
        country: "Canada",
    },
    {
        name: "Thomas Martinez",
        email: "thomas.m@email.com",
        password: "hashedPasswordPQR",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/thomas_martinez_resume.pdf",
        location: "London",
        country: "United Kingdom",
    },
    {
        name: "Jennifer Garcia",
        email: "jennifer.g@email.com",
        password: "hashedPasswordSTU",
        image: {
            filename: 'userimage',
            url: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        resumePath: "/uploads/jennifer_garcia_resume.pdf",
        location: "New York, NY",
        country: "United States",
    },
];

module.exports = { data: sampleUser};