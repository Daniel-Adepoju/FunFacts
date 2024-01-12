/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
            protocol:'https',
            hostname:'lh3googleusercontent.com',
            port:'',
            pathname:'/**'
            }
        ]
    }
}

module.exports = nextConfig