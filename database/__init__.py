'''
	Instructions of installing MongoDB on OSX:
	https://treehouse.github.io/installation-guides/mac/mongo-mac.html

	Schema documentation: https://docs.google.com/document/d/15lyRO3Vg5zmX3JatefXYTYBAwKf0XfWop3kSWnn0Ugk/edit
'''
from pymongo import MongoClient
import json
from .schemas import entity

test_data = [{'title': 'Relational inductive biases, deep learning, and graph networks',
  'creation_date': '2018-6-4',
  'last_updated': '2018-10-17',
  "references": ['Deep Sets'],
  "content": "Artificial intelligence (AI) has undergone a renaissance recently, making major progress in key domains such as vision, language, control, and decision-making. This has been due, in part, to cheap data and cheap compute resources, which have fit the natural strengths of deep learning. However, many defining characteristics of human intelligence, which developed under much different pressures, remain out of reach for current approaches. In particular, generalizing beyond one's experiences--a hallmark of human intelligence from infancy--remains a formidable challenge for modern AI. The following is part position paper, part review, and part unification. We argue that combinatorial generalization must be a top priority for AI to achieve human-like abilities, and that structured representations and computations are key to realizing this objective. Just as biology uses nature and nurture cooperatively, we reject the false choice between \"hand-engineering\" and \"end-to-end\" learning, and instead advocate for an approach which benefits from their complementary strengths. We explore how using relational inductive biases within deep learning architectures can facilitate learning about entities, relations, and rules for composing them. We present a new building block for the AI toolkit with a strong relational inductive bias--the graph network--which generalizes and extends various approaches for neural networks that operate on graphs, and provides a straightforward interface for manipulating structured knowledge and producing structured behaviors. We discuss how graph networks can support relational reasoning and combinatorial generalization, laying the foundation for more sophisticated, interpretable, and flexible patterns of reasoning. As a companion to this paper, we have released an open-source software library for building graph networks, with demonstrations of how to use them in practice.",
  "author": "Peter W. Battaglia, Jessica B. Hamrick, Victor Bapst, Alvaro Sanchez-Gonzalez, Vinicius Zambaldi, Mateusz Malinowski, Andrea Tacchetti, David Raposo, Adam Santoro, Ryan Faulkner, Caglar Gulcehre, Francis Song, Andrew Ballard, Justin Gilmer, George Dahl, Ashish Vaswani, Kelsey Allen, Charles Nash, Victoria Langston, Chris Dyer, Nicolas Heess, Daan Wierstra, Pushmeet Kohli, Matt Botvinick, Oriol Vinyals, Yujia Li, Razvan Pascanu",
  'tags': ['graph networks', 'neural networks', 'graph learning'],
  'num_saves': 8,
  'saves': ['User1', 'Users2'],
  'num_likes': 8,
  'likes': ['User1', 'Users2'],
  'num_citations': 12,
  'citations': ['User1', 'Users2'],
  'content_type': 1},
  {'title': 'Deep Sets',
  'creation_date': '2017-3-10',
  'last_updated': '2018-4-14',
  'references': ['Relational inductive biases, deep learning, and graph networks'],
  'content': 'We study the problem of designing models for machine learning tasks defined on \emph{sets}. In contrast to traditional approach of operating on fixed dimensional vectors, we consider objective functions defined on sets that are invariant to permutations. Such problems are widespread, ranging from estimation of population statistics \cite{poczos13aistats}, to anomaly detection in piezometer data of embankment dams \cite{Jung15Exploration}, to cosmology \cite{Ntampaka16Dynamical,Ravanbakhsh16ICML1}. Our main theorem characterizes the permutation invariant functions and provides a family of functions to which any permutation invariant objective function must belong. This family of functions has a special structure which enables us to design a deep network architecture that can operate on sets and which can be deployed on a variety of scenarios including both unsupervised and supervised learning tasks. We also derive the necessary and sufficient conditions for permutation equivariance in deep models. We demonstrate the applicability of our method on population statistic estimation, point cloud classification, set expansion, and outlier detection.',
  'author': 'Manzil Zaheer, Satwik Kottur, Siamak Ravanbakhsh, Barnabas Poczos, Ruslan Salakhutdinov, Alexander Smola',
  'tags': ['graph networks', 'neural networks', 'graph learning', 'sets'],
  'num_saves': 8,
  'saves': ['User1', 'Users2'],
  'num_likes': 8,
  'likes': ['User1', 'Users2'],
  'num_citations': 63,
  'citations': ['User1', 'Users2'],
  'content_type': 1}]

class Database(object):
	def __init__(self, host='localhost', port=27017):
		self.client = MongoClient(host=['localhost:27017'])
		self.collection = None


	def insert(self, data):
		print(self.filter_all(data))
		if isinstance(data, type(self)):
			# self.collection.insert_one(json.dumps(data.__dict__))
			return True
		return False


	def find(self, query):
		result = self.collection.find({'$and': [{'documenttextfield': {'$regex': '\b' +keyword+'\b'}} for keyword in query]});
		# results = self.collection.find(query)
		print(results)


	def remove(self, data):
		doc = self.find(data)
		print(self.collection.delete_one(doc))



class Users(Database):
	def __init__(self):
		super().__init__(Database)
		self.collection = self.client.user



class RelationalContent(Database):
	def __init__(self):
		super().__init__(Database)
		self.collection = self.client.relations


	def construct_graph(self, data):
		results = self.search(data)

		# BFS on results
		# Score each node based on regularity, string distance, etc.
		# Structure data and pipeline s.t. can later train a nn to rank entity relevance



class EntityContent(Database):
	def __init__(self):
		super().__init__(Database)
		self.collection = self.client.entities
		self.attributes = entity.attributes

	'''
	Input: data (dict)
	'''
	def filter(self, data):
		return all(k in data for k in self.attributes)

	'''
	Input: data (list)
	'''
	def filter_all(self, data):
		return all([self.filter(d) for d in data])


