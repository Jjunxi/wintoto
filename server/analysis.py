import random as rm
import operator
import json
from matplotlib import pyplot as plt
import numpy as np

PICK_NUMBER = 6
ROUND_NUMBER = 314
UPPER_LIMIT = 49
CHECK_NUMBER = 300


all_lucks = []
p = {}
pick_rounds = []


def get_all():
	# pool = [i+1 for i in range(UPPER_LIMIT)]
	# for _ in range(ROUND_NUMBER):
	# 	round = rm.sample(pool, PICK_NUMBER)
	# 	round.sort()
	# 	all_lucks.append(round)
	global all_lucks
	with open('lucks.txt', 'r') as source:
		all_lucks = json.load(source)
		# source.close()
	# return history[:CHECK_NUMBER]

def count_frequence():
	# print(all_lucks)
	for number in range(UPPER_LIMIT):
		time = 0
		for round in all_lucks:
			for luck in round:
				if luck == number+1:
					time += 1
		p[number+1] = time
	# print(p)

def pick_lucks():
	sorted_p = sorted(p.items(), key=operator.itemgetter(1))
	sorted_p.reverse()
	print(sorted_p)
	# print(sorted_p[:2])
	# print(sorted_p[-2:])
	first_round = [pair[0] for pair in sorted_p[:PICK_NUMBER]]
	last_round = [pair[0] for pair in sorted_p[-PICK_NUMBER:]]
	pool = [i+1 for i in range(UPPER_LIMIT)]
	random_all_round = rm.sample(pool, PICK_NUMBER)
	random_better_round = rm.sample(first_round+last_round, PICK_NUMBER)
	first_round.sort()
	last_round.sort()
	random_better_round.sort()
	print('first round:\n{}'.format(first_round))
	print('last round:\n{}'.format(last_round))
	print('random better round:\n{}'.format(random_better_round))
	


def check_result(picks):
	print('pick round:\n{}'.format(picks))
	with open('lucks.txt', 'r') as source:
		history = json.load(source)

	for round in history[CHECK_NUMBER:]:
		win = 0
		for luck in picks:
			for num in round:
				if luck == num:
					win += 1
		if win >= 3:
			print(win)
			print('luck round:\n{}'.format(round))

def show():
	sorted_p = sorted(p.items(), key=operator.itemgetter(1))
	sorted_p.reverse()
	# print(sorted_p)
	x = [ele[0] for ele in sorted_p]
	y = [ele[1] for ele in sorted_p]
	plt.xlim((0, 50))
	plt.ylim((0, 75))
	plt.xlabel('lucky numbers')
	plt.ylabel('frequence')
	plt.xticks(np.arange(1, 50, 1))
	colors = ['r' for i in range(6)] + ['#75bbfd' for i in range(43)]
	plt.bar(x, y, color=colors)
	for m,n in zip(x,y):
		plt.text(m, n+0.05, '%d' % n, ha='center', va= 'bottom')

	plt.show()

if __name__ == '__main__':
	get_all()
	count_frequence()
	pick_lucks()
	show()
	# check_result(pick_rounds)
	
	





