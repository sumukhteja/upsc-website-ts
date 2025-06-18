"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

// Complete syllabus data
const syllabusData = {
  prelims: {
    title: "Preliminary Examination",
    papers: [
      {
        name: "General Studies Paper I",
        topics: [
          "Current events of national and international importance",
          "History of India and Indian National Movement",
          "Indian and World Geography - Physical, Social, Economic geography of India and the World",
          "Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues",
          "Economic and Social Development - Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives",
          "General issues on Environmental Ecology, Biodiversity and Climate Change - that do not require subject specialisation",
          "General Science",
        ],
      },
      {
        name: "General Studies Paper II: CSAT (Civil Services Aptitude Test)",
        topics: [
          "Comprehension",
          "Interpersonal skills including communication skills",
          "Logical reasoning and analytical ability",
          "Decision-making and problem solving",
          "General mental ability",
          "Basic numeracy (numbers and their relations, orders of magnitude, etc.) (Class X level)",
          "Data interpretation (charts, graphs, tables, data sufficiency etc. - Class X level)",
        ],
      },
    ],
  },
  mains: {
    title: "Main Examination",
    papers: [
      {
        name: "Qualifying Papers: Indian Languages and English",
        topics: [
          "Comprehension of given passages",
          "Precis Writing",
          "Usage and Vocabulary",
          "Short Essays",
          "Translation from English to the Indian Language and vice-versa (for Indian Languages only)",
        ],
      },
      {
        name: "Paper I - Essay",
        topics: [
          "Essays on multiple topics",
          "Keeping close to the subject of the essay",
          "Arranging ideas in orderly fashion",
          "Writing concisely with effective and exact expression",
        ],
      },
      {
        name: "Paper II - General Studies I: Indian Heritage and Culture, History and Geography",
        topics: [
          "Indian culture - salient aspects of Art Forms, literature and Architecture from ancient to modern times",
          "Modern Indian history from about the middle of the eighteenth century until the present",
          "The Freedom Struggle — its various stages and important contributors/contributions from different parts of the country",
          "Post-independence consolidation and reorganisation within the country",
          "History of the world - events from 18th century such as industrial revolution, world wars, redrawal of national boundaries, colonisation, decolonization",
          "Salient features of Indian Society, Diversity of India",
          "Role of women and women's organisation, population and associated issues, poverty and developmental issues",
          "Effects of globalisation on Indian society",
          "Social empowerment, communalism, regionalism & secularism",
          "Salient features of the world's physical geography",
          "Distribution of key natural resources across the world (including South Asia and the Indian sub-continent)",
          "Important Geophysical phenomena such as earthquakes, Tsunami, Volcanic activity, cyclones etc.",
        ],
      },
      {
        name: "Paper III - General Studies II: Governance, Constitution, Polity, Social Justice and International Relations",
        topics: [
          "Constitution of India —historical underpinnings, evolution, features, amendments, significant provisions and basic structure",
          "Functions and responsibilities of the Union and the States, issues and challenges pertaining to the federal structure",
          "Separation of powers between various organs dispute redressal mechanisms and institutions",
          "Comparison of the Indian constitutional scheme with that of other countries",
          "Parliament and State legislatures—structure, functioning, conduct of business, powers & privileges",
          "Structure, organisation and functioning of the Executive and the Judiciary",
          "Government policies and interventions for development in various sectors and issues arising out of their design and implementation",
          "Development processes and the development industry —the role of NGOs, SHGs, various groups and associations",
          "Welfare schemes for vulnerable sections of the population by the Centre and States",
          "Issues relating to development and management of Social Sector/Services relating to Health, Education, Human Resources",
          "Important aspects of governance, transparency and accountability, e-governance applications",
          "India and its neighbourhood- relations",
          "Bilateral, regional and global groupings and agreements involving India and/or affecting India's interests",
        ],
      },
      {
        name: "Paper IV - General Studies III: Technology, Economic Development, Biodiversity, Environment, Security and Disaster Management",
        topics: [
          "Indian Economy and issues relating to planning, mobilisation, of resources, growth, development and employment",
          "Inclusive growth and issues arising from it",
          "Government Budgeting",
          "Major crops-cropping patterns in various parts of the country, different types of irrigation and irrigation systems",
          "Issues related to direct and indirect farm subsidies and minimum support prices; Public Distribution System",
          "Food processing and related industries in India- scope and significance, location, upstream and downstream requirements",
          "Land reforms in India",
          "Effects of liberalisation on the economy, changes in industrial policy and their effects on industrial growth",
          "Infrastructure: Energy, Ports, Roads, Airports, Railways etc.",
          "Science and Technology- developments and their applications and effects in everyday life",
          "Achievements of Indians in science & technology; indigenization of technology and developing new technology",
          "Awareness in the fields of IT, Space, Computers, robotics, nano-technology, bio-technology",
          "Conservation, environmental pollution and degradation, environmental impact assessment",
          "Disaster and disaster management",
          "Linkages between development and spread of extremism",
          "Role of external state and non-state actors in creating challenges to internal security",
          "Challenges to internal security through communication networks, role of media and social networking sites",
          "Various Security forces and agencies and their mandate",
        ],
      },
      {
        name: "Paper V - General Studies IV: Ethics, Integrity and Aptitude",
        topics: [
          "Ethics and Human Interface: Essence, determinants and consequences of Ethics in-human actions",
          "Dimensions of ethics; ethics – in private and public relationships",
          "Human Values – lessons from the lives and teachings of great leaders, reformers and administrators",
          "Role of family society and educational institutions in inculcating values",
          "Attitude: content, structure, function; its influence and relation with thought and behaviour",
          "Moral and political attitudes; social influence and persuasion",
          "Aptitude and foundational values for Civil Service, integrity, impartiality and non-partisanship, objectivity",
          "Emotional intelligence-concepts, and their utilities and application in administration and governance",
          "Contributions of moral thinkers and philosophers from India and the world",
          "Public/Civil service values and Ethics in Public administration: Status and problems",
          "Ethical concerns and dilemmas in government and private institutions",
          "Probity in Governance: Concept of public service; Philosophical basis of governance and probity",
          "Information sharing and transparency in government, Right to Information, Codes of Ethics",
          "Case Studies on the above issues",
        ],
      },
    ],
  },
}

export default function SyllabusPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-black" />
              <h1 className="text-3xl font-bold text-gray-900">UPSC Syllabus</h1>
            </div>
            <p className="text-lg text-gray-600">Complete syllabus for UPSC Civil Services Examination</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Prelims Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">{syllabusData.prelims.title}</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Prelims PDF
              </Button>
            </div>

            <div className="grid gap-8">
              {syllabusData.prelims.papers.map((paper, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{paper.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {paper.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mains Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">{syllabusData.mains.title}</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Mains PDF
              </Button>
            </div>

            <div className="grid gap-8">
              {syllabusData.mains.papers.map((paper, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{paper.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {paper.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Optional Subjects Note */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Optional Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Optional subjects syllabus will be added soon. Choose from subjects like History, Geography, Political
                Science, Public Administration, Economics, Sociology, Philosophy, Psychology, Anthropology, and
                Literature.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
