'''
	Data processing module
	Periodically pulls and vectorizes data from user and knowledge databases and stores in 
	dataset mongo database
'''

import json, argparse
import database as db



'''
Vectorize data
'''
def process():
	client = MongoClient(host, port)
	col = client.knowledge


def main():
	parser = argparse.ArgumentParser()
	parser.add_argument('--host', type=str, default='localhost', help='MongoDB host address')
	parser.add_argument('--port', type=int, default=27017, help='MongoDB host port')
	args = parser.parse_args()
	process(args)


if __name__ == '__main__':
	main()