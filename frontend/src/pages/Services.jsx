import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Server, 
  Network, 
  Cloud, 
  Shield, 
  Database,
  Smartphone,
  BarChart3
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks like React, Vue, and Node.js.',
      features: ['Responsive Design', 'SEO Optimization', 'Progressive Web Apps']
    },
    {
      icon: Server,
      title: 'ICT Support',
      description: 'Comprehensive IT support and maintenance services to keep your systems running smoothly.',
      features: ['24/7 Support', 'Hardware Maintenance', 'Software Updates']
    },
    {
      icon: Network,
      title: 'Networking Solutions',
      description: 'Design and implementation of secure and scalable network infrastructure.',
      features: ['Network Design', 'Security Implementation', 'Performance Monitoring']
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description: 'Cloud migration, deployment, and management across multiple platforms.',
      features: ['AWS & Azure', 'Cloud Migration', 'Cost Optimization']
    },
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Protect your business from cyber threats with our comprehensive security solutions.',
      features: ['Threat Detection', 'Security Audits', 'Data Protection']
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Efficient database design, optimization, and management services.',
      features: ['Database Design', 'Performance Tuning', 'Backup Solutions']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['Native Apps', 'Cross-Platform', 'App Store Deployment']
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Data analytics and visualization solutions to drive informed business decisions.',
      features: ['Data Analytics', 'Dashboard Creation', 'Insight Reporting']
    }
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to empower your business 
            and drive digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services