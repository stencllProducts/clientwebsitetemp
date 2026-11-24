import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Search, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const categories = [
  { id: "all", label: "All Posts" },
  { id: "news", label: "News & Updates" },
  { id: "stories", label: "Impact Stories" },
  { id: "resources", label: "Resources" },
  { id: "events", label: "Event Recaps" }
];

const blogPosts = [
  {
    id: 1,
    title: "Breaking Barriers: How Community Support Transforms Mental Health Care",
    excerpt: "Explore the powerful impact of community-driven mental health initiatives and how peer support is revolutionizing access to care in underserved communities.",
    category: "stories",
    date: "2024-01-10",
    author: "Dr. Sarah Johnson",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "New Partnership Brings Mental Health Resources to East Side Schools",
    excerpt: "We're excited to announce our collaboration with Lincoln High School to provide on-site counseling and mental health education workshops for students and families.",
    category: "news",
    date: "2024-01-08",
    author: "Marcus Rodriguez",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Art Therapy Success: Maria's Journey from Trauma to Healing",
    excerpt: "Read Maria's inspiring story of how creative expression through our art therapy program helped her process trauma and discover her inner strength.",
    category: "stories",
    date: "2024-01-05",
    author: "Dr. Maria Santos",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=300&fit=crop"
  },
  {
    id: 4,
    title: "10 Signs Someone You Know Might Need Mental Health Support",
    excerpt: "Learn to recognize the warning signs and discover how to approach conversations about mental health with compassion and understanding.",
    category: "resources",
    date: "2024-01-03",
    author: "Psybriety Team",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=300&fit=crop"
  },
  {
    id: 5,
    title: "December Workshop Recap: 25 New Peer Advocates Join Our Community",
    excerpt: "Our December Mental Health First Aid training was our largest yet, with 25 community members earning certification as peer advocates.",
    category: "events",
    date: "2023-12-28",
    author: "James Wilson",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Building Resilience: Coping Strategies for the New Year",
    excerpt: "Start 2024 with practical tools for maintaining mental wellness, managing stress, and building emotional resilience in uncertain times.",
    category: "resources",
    date: "2023-12-25",
    author: "Dr. Aisha Patel",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
  }
];

const categoryColors = {
  news: "bg-blue-100 text-blue-800 border-blue-200",
  stories: "bg-purple-100 text-purple-800 border-purple-200",
  resources: "bg-green-100 text-green-800 border-green-200",
  events: "bg-orange-100 text-orange-800 border-orange-200"
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'all');

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              News &
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay connected with our community impact, read inspiring stories of transformation, 
              and access valuable mental health resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-teal-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                      : "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "all" && searchTerm === "" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Story</h2>
              
              <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-teal-100 text-teal-800 border-teal-200 border font-medium">
                        FEATURED
                      </Badge>
                      <Badge className={`${categoryColors[featuredPost.category]} border`}>
                        {featuredPost.category.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-4">{featuredPost.author}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="mr-4">{format(new Date(featuredPost.date), "MMM d, yyyy")}</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {selectedCategory === "all" ? "Latest Articles" : `${categories.find(c => c.id === selectedCategory)?.label}`}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] h-full overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${categoryColors[post.category]} border`}>
                        {post.category.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="space-y-4 mt-auto">
                      <div className="flex items-center text-sm text-gray-400">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-3">{post.author}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                      </div>
                      <Button variant="outline" className="w-full border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-gray-300">
                Your search for "{searchTerm}" did not match any articles. Please try a different term.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Connected</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest stories, resources, and updates delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                />
              </div>
              <Button className="px-8 py-4 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}