// DSA Interview Prep dataset — 25 patterns × 10 problems (250 total).
// Problem tuple: [name, leetcodeSlug, difficulty, priority, companies, hint, insight]
// companies: G=Google A=Amazon M=Meta Ap=Apple N=Nvidia Ms=Microsoft
// difficulty: E/M/H  priority: P1/P2/P3
const LC = 'https://leetcode.com/problems/';

const PATTERNS = [
  {
    id: 'sliding-window', number: 1, name: 'Sliding Window', priority: 'P1',
    time: 'O(n)', space: 'O(k)',
    whenToUse: 'Contiguous subarray/substring problems asking for max/min/count over a window.',
    triggers: ['contiguous subarray or substring', 'longest/shortest/max/min window', 'sum/avg/distinct within k'],
    coreIdea: 'Expand the right edge, shrink the left edge to maintain a valid window; track the best as you slide.',
    template: `def sliding_window(s):
    left = 0
    window = {}          # or a running sum/count
    best = 0
    for right, ch in enumerate(s):
        window[ch] = window.get(ch, 0) + 1
        while not_valid(window):       # shrink until valid
            window[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
    problems: [
      ['Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'M', 'P1', 'G/A/M/Ap/Ms', 'Track last-seen index of each char', 'Jump left pointer past the duplicate, do not step by one'],
      ['Minimum Window Substring', 'minimum-window-substring', 'H', 'P1', 'G/A/M/Ms', 'Need-count map + formed counter', 'Contract only when all required chars are satisfied'],
      ['Longest Repeating Character Replacement', 'longest-repeating-character-replacement', 'M', 'P1', 'G/A/M', 'window - maxFreq <= k', 'Window is valid while replaceable chars fit budget k'],
      ['Permutation in String', 'permutation-in-string', 'M', 'P1', 'G/A/M/Ms', 'Fixed-size window of len(s1)', 'Compare frequency maps of a fixed window'],
      ['Sliding Window Maximum', 'sliding-window-maximum', 'H', 'P1', 'G/A/M/Ap', 'Monotonic decreasing deque of indices', 'Deque front is always the current window max'],
      ['Longest Substring with At Most K Distinct Characters', 'longest-substring-with-at-most-k-distinct-characters', 'M', 'P2', 'G/A/M', 'Shrink when distinct > k', 'Map size is the distinct-count invariant'],
      ['Fruit Into Baskets', 'fruit-into-baskets', 'M', 'P2', 'G/A', 'At most 2 distinct types', 'Same as at-most-2-distinct sliding window'],
      ['Max Consecutive Ones III', 'max-consecutive-ones-iii', 'M', 'P2', 'G/A/M', 'Count zeros in window <= k', 'Track zero budget instead of the numbers'],
      ['Subarray Product Less Than K', 'subarray-product-less-than-k', 'M', 'P2', 'A/M', 'Shrink while product >= k', 'Each right adds (right-left+1) subarrays'],
      ['Minimum Size Subarray Sum', 'minimum-size-subarray-sum', 'M', 'P1', 'G/A/Ms', 'Shrink while sum >= target', 'Shrink aggressively to find the shortest valid window'],
    ],
  },
  {
    id: 'two-pointers', number: 2, name: 'Two Pointers', priority: 'P1',
    time: 'O(n)', space: 'O(1)',
    whenToUse: 'Sorted arrays, pair/triplet sums, partitioning, or converging from both ends.',
    triggers: ['sorted input', 'find a pair/triplet', 'in-place partition or dedupe', 'palindrome check'],
    coreIdea: 'Move two indices toward each other (or same direction) based on a comparison to prune the search.',
    template: `def two_pointers(nums):        # nums sorted
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target: return (lo, hi)
        if s < target: lo += 1
        else: hi -= 1
    return None`,
    problems: [
      ['Two Sum II - Input Array Is Sorted', 'two-sum-ii-input-array-is-sorted', 'M', 'P1', 'G/A/M/Ap', 'Converge from both ends', 'Sorted order lets you decide direction by the sum'],
      ['3Sum', '3sum', 'M', 'P1', 'G/A/M/Ap/Ms', 'Fix one, two-pointer the rest', 'Sort first, then skip duplicates on all three'],
      ['Container With Most Water', 'container-with-most-water', 'M', 'P1', 'G/A/M/Ap', 'Move the shorter wall inward', 'Shorter side caps area, so moving it is the only hope'],
      ['Trapping Rain Water', 'trapping-rain-water', 'H', 'P1', 'G/A/M/Ap/Ms', 'Track leftMax and rightMax', 'Water at i is min(leftMax,rightMax) - height'],
      ['Sort Colors', 'sort-colors', 'M', 'P1', 'G/A/M/Ms', 'Dutch national flag, 3 pointers', 'One pass, swap 0s to front and 2s to back'],
      ['Remove Duplicates from Sorted Array', 'remove-duplicates-from-sorted-array', 'E', 'P2', 'G/A/Ms', 'Slow write pointer', 'Slow pointer marks next unique slot'],
      ['3Sum Closest', '3sum-closest', 'M', 'P2', 'G/A/M', 'Track closest sum to target', 'Same scan as 3Sum but minimize |sum-target|'],
      ['4Sum', '4sum', 'M', 'P2', 'A/M', 'Two nested loops + two pointers', 'Generalize kSum recursively with dedup'],
      ['Valid Palindrome', 'valid-palindrome', 'E', 'P1', 'G/A/M/Ap', 'Skip non-alnum, compare ends', 'Two pointers converge, normalizing case'],
      ['Boats to Save People', 'boats-to-save-people', 'M', 'P2', 'A/G', 'Pair lightest with heaviest', 'Greedy pairing from sorted ends'],
    ],
  },
  {
    id: 'fast-slow', number: 3, name: 'Fast & Slow Pointers', priority: 'P1',
    time: 'O(n)', space: 'O(1)',
    whenToUse: 'Linked-list cycle detection, finding middle, or cycle-in-sequence problems.',
    triggers: ['linked list cycle', 'find middle/nth node', 'happy number / cycle in function iteration'],
    coreIdea: 'Advance one pointer twice as fast; they meet inside any cycle (Floyd), or fast reaching end locates the middle.',
    template: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    problems: [
      ['Linked List Cycle', 'linked-list-cycle', 'E', 'P1', 'G/A/M/Ap/Ms', 'Floyd tortoise and hare', 'Fast catches slow iff a cycle exists'],
      ['Linked List Cycle II', 'linked-list-cycle-ii', 'M', 'P1', 'G/A/M/Ms', 'Reset one pointer to head after meet', 'Distance math finds the cycle entry node'],
      ['Middle of the Linked List', 'middle-of-the-linked-list', 'E', 'P1', 'G/A/M/Ap', 'Fast moves 2x', 'When fast hits end, slow is at middle'],
      ['Happy Number', 'happy-number', 'E', 'P1', 'G/A/Ap', 'Detect cycle in digit-square sequence', 'Treat the sequence as an implicit linked list'],
      ['Remove Nth Node From End of List', 'remove-nth-node-from-end-of-list', 'M', 'P1', 'G/A/M/Ap/Ms', 'Gap of n between two pointers', 'Lead pointer by n, then move both to end'],
      ['Palindrome Linked List', 'palindrome-linked-list', 'E', 'P1', 'G/A/M/Ap', 'Find middle, reverse half', 'Reverse second half and compare in O(1) space'],
      ['Reorder List', 'reorder-list', 'M', 'P2', 'G/A/M', 'Middle + reverse + merge', 'Split, reverse tail, weave the two lists'],
      ['Find the Duplicate Number', 'find-the-duplicate-number', 'M', 'P1', 'G/A/M/Ms', 'Value-as-pointer Floyd cycle', 'Indices form a cycle whose entry is the duplicate'],
      ['Circular Array Loop', 'circular-array-loop', 'M', 'P3', 'G/A', 'Direction-consistent cycle', 'Reject cycles of length 1 or mixed direction'],
      ['Intersection of Two Linked Lists', 'intersection-of-two-linked-lists', 'E', 'P1', 'G/A/M/Ap/Ms', 'Switch heads at end', 'Both pointers travel len(a)+len(b) and meet'],
    ],
  },
  {
    id: 'merge-intervals', number: 4, name: 'Merge Intervals', priority: 'P1',
    time: 'O(n log n)', space: 'O(n)',
    whenToUse: 'Overlapping ranges: merging, inserting, scheduling, counting rooms.',
    triggers: ['intervals / ranges', 'overlap or merge', 'meeting rooms / scheduling'],
    coreIdea: 'Sort by start; sweep and merge when the current start is within the previous end.',
    template: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    out = [intervals[0]]
    for s, e in intervals[1:]:
        if s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out`,
    problems: [
      ['Merge Intervals', 'merge-intervals', 'M', 'P1', 'G/A/M/Ap/Ms', 'Sort by start, merge overlaps', 'Overlap iff next.start <= current.end'],
      ['Insert Interval', 'insert-interval', 'M', 'P1', 'G/A/M/Ms', 'Three phases: before/overlap/after', 'Merge the overlapping band, keep the rest'],
      ['Non-overlapping Intervals', 'non-overlapping-intervals', 'M', 'P1', 'G/A/M', 'Greedy keep earliest end', 'Remove the interval that ends latest on conflict'],
      ['Meeting Rooms', 'meeting-rooms', 'E', 'P1', 'G/A/M/Ap', 'Sort, check adjacent overlap', 'Any overlap means cannot attend all'],
      ['Meeting Rooms II', 'meeting-rooms-ii', 'M', 'P1', 'G/A/M/Ap/Ms', 'Min-heap of end times', 'Peak concurrency = rooms needed'],
      ['Interval List Intersections', 'interval-list-intersections', 'M', 'P2', 'G/A/M', 'Two pointers over both lists', 'Intersection is max(starts)..min(ends)'],
      ['Employee Free Time', 'employee-free-time', 'H', 'P2', 'G/A/M', 'Flatten, sort, find gaps', 'Free time is the gaps in merged busy intervals'],
      ['My Calendar I', 'my-calendar-i', 'M', 'P2', 'G/A', 'Reject if overlaps existing', 'Balanced tree or linear scan for conflicts'],
      ['Car Pooling', 'car-pooling', 'M', 'P2', 'A/G', 'Difference array on timeline', 'Sweep passenger deltas, never exceed capacity'],
      ['Minimum Number of Arrows to Burst Balloons', 'minimum-number-of-arrows-to-burst-balloons', 'M', 'P2', 'G/A', 'Greedy by end coordinate', 'Shoot at the earliest end, count new groups'],
    ],
  },
  {
    id: 'binary-search', number: 5, name: 'Binary Search', priority: 'P1',
    time: 'O(log n)', space: 'O(1)',
    whenToUse: 'Sorted arrays, or any monotonic predicate you can binary-search the answer on.',
    triggers: ['sorted array', 'find boundary / first-or-last', 'minimize the maximum / search the answer'],
    coreIdea: 'Halve the search space each step using a monotonic condition; the tricky part is the boundary invariant.',
    template: `def lower_bound(nums, target):
    lo, hi = 0, len(nums)          # [lo, hi)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
    problems: [
      ['Binary Search', 'binary-search', 'E', 'P1', 'G/A/M/Ap/Ms', 'Classic halving', 'Get the boundary invariant right'],
      ['Search in Rotated Sorted Array', 'search-in-rotated-sorted-array', 'M', 'P1', 'G/A/M/Ap/Ms', 'One half is always sorted', 'Decide which half is sorted, then narrow'],
      ['Find Minimum in Rotated Sorted Array', 'find-minimum-in-rotated-sorted-array', 'M', 'P1', 'G/A/M/Ms', 'Compare mid with hi', 'Pivot is where order breaks'],
      ['Find First and Last Position of Element in Sorted Array', 'find-first-and-last-position-of-element-in-sorted-array', 'M', 'P1', 'G/A/M/Ms', 'Two boundary searches', 'lower_bound and upper_bound of target'],
      ['Median of Two Sorted Arrays', 'median-of-two-sorted-arrays', 'H', 'P1', 'G/A/M/Ap/Ms', 'Binary search the partition', 'Partition so left half count is fixed'],
      ['Koko Eating Bananas', 'koko-eating-bananas', 'M', 'P1', 'G/A/M', 'Search the eating speed', 'Monotonic: faster speed never fails if slower did'],
      ['Search a 2D Matrix', 'search-a-2d-matrix', 'M', 'P1', 'G/A/M/Ms', 'Treat as flattened sorted array', 'Map 1D index to (row, col)'],
      ['Capacity To Ship Packages Within D Days', 'capacity-to-ship-packages-within-d-days', 'M', 'P2', 'G/A/Ap', 'Search the capacity', 'Feasibility is monotonic in capacity'],
      ['Time Based Key-Value Store', 'time-based-key-value-store', 'M', 'P2', 'G/A/M', 'Binary search on timestamps', 'upper_bound on stored times per key'],
      ['Split Array Largest Sum', 'split-array-largest-sum', 'H', 'P2', 'G/A/M', 'Search the max subarray sum', 'Minimize the maximum via feasibility check'],
    ],
  },
  {
    id: 'bfs', number: 6, name: 'BFS', priority: 'P1',
    time: 'O(V+E)', space: 'O(V)',
    whenToUse: 'Shortest path in unweighted graphs/grids, level-order traversal, multi-source spread.',
    triggers: ['shortest path unweighted', 'level order / by layers', 'flood fill / spread from sources'],
    coreIdea: 'Process nodes in FIFO order layer by layer; the first time you reach a node is via a shortest path.',
    template: `from collections import deque
def bfs(start):
    q = deque([start]); seen = {start}; dist = 0
    while q:
        for _ in range(len(q)):
            node = q.popleft()
            for nxt in neighbors(node):
                if nxt not in seen:
                    seen.add(nxt); q.append(nxt)
        dist += 1
    return dist`,
    problems: [
      ['Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal', 'M', 'P1', 'G/A/M/Ap/Ms', 'Queue, process by level size', 'Snapshot queue length to bound each level'],
      ['Rotting Oranges', 'rotting-oranges', 'M', 'P1', 'G/A/M/Ms', 'Multi-source BFS', 'Seed all rotten cells, count layers'],
      ['Word Ladder', 'word-ladder', 'H', 'P1', 'G/A/M/Ap', 'Words as graph nodes', 'BFS gives shortest transformation'],
      ['01 Matrix', '01-matrix', 'M', 'P1', 'G/A/M', 'Multi-source from all zeros', 'Distance to nearest zero via layered BFS'],
      ['Number of Islands', 'number-of-islands', 'M', 'P1', 'G/A/M/Ap/Ms', 'BFS/DFS flood each island', 'Count connected components of land'],
      ['Shortest Path in Binary Matrix', 'shortest-path-in-binary-matrix', 'M', 'P1', 'G/A/M', '8-directional grid BFS', 'BFS layer count is the shortest path'],
      ['Binary Tree Right Side View', 'binary-tree-right-side-view', 'M', 'P1', 'G/A/M/Ap', 'Last node per level', 'Rightmost node of each BFS layer'],
      ['Walls and Gates', 'walls-and-gates', 'M', 'P2', 'G/A/M', 'Multi-source from gates', 'BFS out from every gate at once'],
      ['Open the Lock', 'open-the-lock', 'M', 'P2', 'G/A', 'State-space BFS', 'Each wheel turn is an edge, avoid deadends'],
      ['Minimum Knight Moves', 'minimum-knight-moves', 'M', 'P2', 'G/A/M', 'BFS on infinite board', 'Exploit symmetry to bound the search'],
    ],
  },
  {
    id: 'dfs-backtracking', number: 7, name: 'DFS + Backtracking', priority: 'P1',
    time: 'O(2^n)-O(n!)', space: 'O(n)',
    whenToUse: 'Generate all combinations/permutations/subsets, constraint satisfaction, exhaustive search.',
    triggers: ['all subsets/permutations/combinations', 'place/choose with constraints', 'try then undo'],
    coreIdea: 'Choose, recurse, un-choose. Prune branches that cannot lead to a valid solution.',
    template: `def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:]); return
    for i, c in enumerate(choices):
        if not valid(c): continue
        path.append(c)                 # choose
        backtrack(path, remaining(choices, i))
        path.pop()                     # un-choose`,
    problems: [
      ['Subsets', 'subsets', 'M', 'P1', 'G/A/M/Ap/Ms', 'Include/exclude each element', 'Every element doubles the set count'],
      ['Permutations', 'permutations', 'M', 'P1', 'G/A/M/Ap/Ms', 'Swap or used-array', 'Fix each position from remaining choices'],
      ['Combination Sum', 'combination-sum', 'M', 'P1', 'G/A/M/Ms', 'Reuse allowed, index guard', 'Stay at index to allow repeats, advance to avoid dups'],
      ['Word Search', 'word-search', 'M', 'P1', 'G/A/M/Ap/Ms', 'Grid DFS with visited mark', 'Mark cell, recurse, then restore'],
      ['Generate Parentheses', 'generate-parentheses', 'M', 'P1', 'G/A/M/Ap', 'Track open/close counts', 'Only close when open remains, only open below n'],
      ['Palindrome Partitioning', 'palindrome-partitioning', 'M', 'P1', 'G/A/M', 'Cut when prefix is palindrome', 'Recurse on the suffix after each valid cut'],
      ['N-Queens', 'n-queens', 'H', 'P1', 'G/A/M/Ap', 'Track cols and diagonals', 'Two diagonals keyed by r+c and r-c'],
      ['Combinations', 'combinations', 'M', 'P2', 'G/A/M', 'Choose k from n', 'Advance start index to avoid reorderings'],
      ['Letter Combinations of a Phone Number', 'letter-combinations-of-a-phone-number', 'M', 'P1', 'G/A/M/Ap/Ms', 'Digit-to-letters map', 'Cartesian product via recursion'],
      ['Sudoku Solver', 'sudoku-solver', 'H', 'P2', 'G/A/M/Ap', 'Try 1-9 with constraint checks', 'Backtrack on the first empty cell'],
    ],
  },
  {
    id: 'dynamic-programming', number: 8, name: 'Dynamic Programming', priority: 'P1',
    time: 'O(n·m)', space: 'O(n·m)',
    whenToUse: 'Overlapping subproblems with optimal substructure: counting, min/max cost, feasibility.',
    triggers: ['count ways / min cost / max value', 'overlapping subproblems', 'decision at each step depends on prior'],
    coreIdea: 'Define a state, a recurrence over smaller states, and a base case; memoize or fill a table bottom-up.',
    template: `def dp(n):
    memo = {}
    def solve(i):
        if i in base: return base_value(i)
        if i in memo: return memo[i]
        memo[i] = best(solve(i-1), solve(i-2) + cost(i))
        return memo[i]
    return solve(n)`,
    problems: [
      ['Climbing Stairs', 'climbing-stairs', 'E', 'P1', 'G/A/M/Ap', 'Fibonacci recurrence', 'ways(n) = ways(n-1) + ways(n-2)'],
      ['House Robber', 'house-robber', 'M', 'P1', 'G/A/M/Ms', 'Rob or skip each house', 'best(i) = max(skip, rob + best(i-2))'],
      ['Coin Change', 'coin-change', 'M', 'P1', 'G/A/M/Ap/Ms', 'Min coins per amount', 'dp[a] = min over coins of dp[a-coin]+1'],
      ['Longest Increasing Subsequence', 'longest-increasing-subsequence', 'M', 'P1', 'G/A/M/Ms', 'Patience sorting / DP', 'Binary-search tails array for O(n log n)'],
      ['Word Break', 'word-break', 'M', 'P1', 'G/A/M/Ap/Ms', 'Can prefix be segmented', 'dp[i] true if some word ends at i and dp[start]'],
      ['Longest Common Subsequence', 'longest-common-subsequence', 'M', 'P1', 'G/A/M/Ms', '2D grid DP', 'Match extends diagonal, else max of neighbors'],
      ['Unique Paths', 'unique-paths', 'M', 'P1', 'G/A/M/Ap', 'Grid path counting', 'paths = up + left'],
      ['Maximum Subarray', 'maximum-subarray', 'M', 'P1', 'G/A/M/Ap/Ms', "Kadane's algorithm", 'Reset running sum when it goes negative'],
      ['Partition Equal Subset Sum', 'partition-equal-subset-sum', 'M', 'P1', 'G/A/M', '0/1 knapsack on sum/2', 'Reach target subset sum with subset of items'],
      ['Edit Distance', 'edit-distance', 'M', 'P1', 'G/A/M/Ms', 'Insert/delete/replace DP', 'Match free, else 1 + min of three edits'],
    ],
  },
  {
    id: 'top-k-heap', number: 9, name: 'Top K / Heap', priority: 'P1',
    time: 'O(n log k)', space: 'O(k)',
    whenToUse: 'Find k largest/smallest/most-frequent, or a streaming order statistic.',
    triggers: ['top/smallest/closest k', 'most frequent', 'streaming order statistic'],
    coreIdea: 'Keep a size-k heap: a min-heap for the k largest (pop the smallest when it overflows).',
    template: `import heapq
def top_k(nums, k):
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)        # drop the smallest
    return heap                         # k largest`,
    problems: [
      ['Kth Largest Element in an Array', 'kth-largest-element-in-an-array', 'M', 'P1', 'G/A/M/Ap/Ms', 'Size-k min-heap or quickselect', 'Heap top is the kth largest'],
      ['Top K Frequent Elements', 'top-k-frequent-elements', 'M', 'P1', 'G/A/M/Ap/Ms', 'Count then heap/bucket', 'Bucket by frequency for O(n)'],
      ['K Closest Points to Origin', 'k-closest-points-to-origin', 'M', 'P1', 'G/A/M/Ap', 'Max-heap of size k by distance', 'No need for actual sqrt, compare squared dist'],
      ['Merge k Sorted Lists', 'merge-k-sorted-lists', 'H', 'P1', 'G/A/M/Ap/Ms', 'Heap of list heads', 'Always pop the global minimum head'],
      ['Find Median from Data Stream', 'find-median-from-data-stream', 'H', 'P1', 'G/A/M/Ap/Ms', 'Two heaps balanced', 'Max-heap low half, min-heap high half'],
      ['Task Scheduler', 'task-scheduler', 'M', 'P1', 'G/A/M', 'Greedy by highest frequency', 'Idle slots driven by the most frequent task'],
      ['Reorganize String', 'reorganize-string', 'M', 'P2', 'G/A/M', 'Place most frequent first', 'Fail if any char exceeds (n+1)/2'],
      ['Kth Largest Element in a Stream', 'kth-largest-element-in-a-stream', 'E', 'P2', 'G/A/M/Ap', 'Persistent size-k min-heap', 'Heap top stays the kth largest across adds'],
      ['Sort Characters By Frequency', 'sort-characters-by-frequency', 'M', 'P2', 'G/A', 'Count then order by count', 'Bucket sort by frequency'],
      ['Top K Frequent Words', 'top-k-frequent-words', 'M', 'P2', 'G/A/M', 'Heap with tie-break on word', 'Break frequency ties lexicographically'],
    ],
  },
  {
    id: 'monotonic-stack', number: 10, name: 'Monotonic Stack', priority: 'P1',
    time: 'O(n)', space: 'O(n)',
    whenToUse: 'Next/previous greater or smaller element, spans, or histogram-style problems.',
    triggers: ['next/previous greater or smaller', 'largest rectangle / span', 'temperatures / stock span'],
    coreIdea: 'Maintain a stack that stays monotonic; pop while the incoming element breaks the order, resolving answers as you pop.',
    template: `def next_greater(nums):
    res = [-1] * len(nums)
    stack = []                          # indices, decreasing values
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            res[stack.pop()] = x
        stack.append(i)
    return res`,
    problems: [
      ['Daily Temperatures', 'daily-temperatures', 'M', 'P1', 'G/A/M/Ap/Ms', 'Next warmer day', 'Stack of indices awaiting a greater value'],
      ['Next Greater Element I', 'next-greater-element-i', 'E', 'P1', 'G/A/M', 'Precompute next-greater map', 'Monotonic stack over nums2'],
      ['Next Greater Element II', 'next-greater-element-ii', 'M', 'P1', 'G/A/M', 'Circular array, 2n pass', 'Iterate twice mod n to wrap around'],
      ['Largest Rectangle in Histogram', 'largest-rectangle-in-histogram', 'H', 'P1', 'G/A/M/Ap/Ms', 'Increasing stack of bars', 'Width fixed when a shorter bar pops it'],
      ['Trapping Rain Water', 'trapping-rain-water', 'H', 'P1', 'G/A/M/Ap/Ms', 'Stack of descending walls', 'Water fills between a bar and the next taller'],
      ['Maximal Rectangle', 'maximal-rectangle', 'H', 'P2', 'G/A/M', 'Histogram per row', 'Reduce each row to a histogram problem'],
      ['Remove K Digits', 'remove-k-digits', 'M', 'P1', 'G/A/M', 'Pop bigger leading digits', 'Greedily keep an increasing prefix'],
      ['Sum of Subarray Minimums', 'sum-of-subarray-minimums', 'M', 'P2', 'A/M', 'Contribution of each min', 'Count spans where each element is the minimum'],
      ['Online Stock Span', 'online-stock-span', 'M', 'P2', 'G/A', 'Span back to a higher price', 'Collapse spans of smaller prices'],
      ['Asteroid Collision', 'asteroid-collision', 'M', 'P2', 'G/A/M', 'Stack resolves collisions', 'Right-movers wait, left-movers fight the stack'],
    ],
  },
  {
    id: 'trie', number: 11, name: 'Trie', priority: 'P2',
    time: 'O(L)', space: 'O(N·L)',
    whenToUse: 'Prefix search, autocomplete, word dictionaries, and multi-word matching on a grid.',
    triggers: ['prefix / startsWith', 'autocomplete / dictionary', 'many words to match at once'],
    coreIdea: 'A tree of characters where each path spells a prefix; mark node ends to denote complete words.',
    template: `class Trie:
    def __init__(self):
        self.children = {}
        self.end = False
    def insert(self, word):
        node = self
        for ch in word:
            node = node.children.setdefault(ch, Trie())
        node.end = True`,
    problems: [
      ['Implement Trie (Prefix Tree)', 'implement-trie-prefix-tree', 'M', 'P1', 'G/A/M/Ap/Ms', 'Nested dict of children', 'Mark terminal nodes for full words'],
      ['Design Add and Search Words Data Structure', 'design-add-and-search-words-data-structure', 'M', 'P1', 'G/A/M/Ms', 'Wildcard branches all children', 'DFS on "." trying every child'],
      ['Word Search II', 'word-search-ii', 'H', 'P1', 'G/A/M/Ap', 'Trie + grid DFS', 'Trie prunes dead prefixes during DFS'],
      ['Replace Words', 'replace-words', 'M', 'P2', 'G/A', 'Shortest root prefix', 'Stop at first end-node along the word'],
      ['Map Sum Pairs', 'map-sum-pairs', 'M', 'P2', 'G/A', 'Prefix sum over trie', 'Store value at end, sum subtree on query'],
      ['Longest Word in Dictionary', 'longest-word-in-dictionary', 'M', 'P2', 'G/A', 'Word buildable char by char', 'Only valid if every prefix is a word'],
      ['Search Suggestions System', 'search-suggestions-system', 'M', 'P1', 'A/G/M', 'Top-3 per prefix', 'Sort words, walk trie collecting three'],
      ['Maximum XOR of Two Numbers in an Array', 'maximum-xor-of-two-numbers-in-an-array', 'M', 'P2', 'G/A/M', 'Bitwise trie', 'Greedily pick the opposite bit at each level'],
      ['Concatenated Words', 'concatenated-words', 'H', 'P3', 'A/M', 'Trie + DP segmentation', 'Word breaks into other dictionary words'],
      ['Stream of Characters', 'stream-of-characters', 'H', 'P3', 'G/A', 'Suffix trie of reversed words', 'Match suffixes of the growing stream'],
    ],
  },
  {
    id: 'union-find', number: 12, name: 'Union-Find (DSU)', priority: 'P1',
    time: 'O(α(n))', space: 'O(n)',
    whenToUse: 'Connectivity, grouping, cycle detection in undirected graphs, and dynamic merging.',
    triggers: ['connected components', 'are two nodes connected', 'merge groups / detect undirected cycle'],
    coreIdea: 'Each set has a representative; union by rank and path compression make find near-constant.',
    template: `parent = list(range(n))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path compression
        x = parent[x]
    return x
def union(a, b):
    parent[find(a)] = find(b)`,
    problems: [
      ['Number of Provinces', 'number-of-provinces', 'M', 'P1', 'G/A/M/Ms', 'Union connected cities', 'Count distinct roots at the end'],
      ['Redundant Connection', 'redundant-connection', 'M', 'P1', 'G/A/M', 'Edge that closes a cycle', 'First union that finds same root is the answer'],
      ['Accounts Merge', 'accounts-merge', 'M', 'P1', 'G/A/M/Ms', 'Union emails by owner', 'Emails sharing an account join one set'],
      ['Number of Connected Components in an Undirected Graph', 'number-of-connected-components-in-an-undirected-graph', 'M', 'P1', 'G/A/M', 'Union each edge', 'Components = n minus successful unions'],
      ['Graph Valid Tree', 'graph-valid-tree', 'M', 'P1', 'G/A/M', 'n-1 edges, no cycle', 'Tree iff fully connected and acyclic'],
      ['Most Stones Removed with Same Row or Column', 'most-stones-removed-with-same-row-or-column', 'M', 'P2', 'G/A', 'Union by row/column', 'Removable = total minus component count'],
      ['Satisfiability of Equality Equations', 'satisfiability-of-equality-equations', 'M', 'P2', 'G/A/M', 'Union equals, check not-equals', 'Process == before checking != conflicts'],
      ['Number of Islands II', 'number-of-islands-ii', 'H', 'P2', 'G/A/M', 'Incremental island count', 'Each add either creates or merges islands'],
      ['Smallest String With Swaps', 'smallest-string-with-swaps', 'M', 'P2', 'G/A', 'Union swap indices', 'Sort chars within each connected group'],
      ['Redundant Connection II', 'redundant-connection-ii', 'H', 'P3', 'G/A', 'Rooted-tree cycle cases', 'Handle two-parents vs cycle separately'],
    ],
  },
  {
    id: 'topological-sort', number: 13, name: 'Topological Sort', priority: 'P1',
    time: 'O(V+E)', space: 'O(V+E)',
    whenToUse: 'Ordering with prerequisites/dependencies on a directed acyclic graph.',
    triggers: ['prerequisites / dependencies', 'valid ordering exists?', 'course schedule / build order'],
    coreIdea: "Repeatedly remove nodes with no incoming edges (Kahn's), or DFS post-order and reverse.",
    template: `from collections import deque
def topo(n, edges):
    indeg = [0]*n; g = [[] for _ in range(n)]
    for u, v in edges:
        g[u].append(v); indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i]==0)
    order = []
    while q:
        u = q.popleft(); order.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v]==0: q.append(v)
    return order if len(order)==n else []`,
    problems: [
      ['Course Schedule', 'course-schedule', 'M', 'P1', 'G/A/M/Ap/Ms', 'Cycle detection via indegree', 'Finishable iff a topo order exists'],
      ['Course Schedule II', 'course-schedule-ii', 'M', 'P1', 'G/A/M/Ap/Ms', 'Return the order', "Kahn's order is the schedule"],
      ['Alien Dictionary', 'alien-dictionary', 'H', 'P1', 'G/A/M/Ap', 'Derive edges from word pairs', 'First differing char gives an ordering edge'],
      ['Minimum Height Trees', 'minimum-height-trees', 'M', 'P2', 'G/A/M', 'Trim leaves inward', 'Centers are the last 1-2 nodes remaining'],
      ['Sequence Reconstruction', 'sequence-reconstruction', 'M', 'P3', 'G/A', 'Unique topo order check', 'Valid iff queue never holds 2+ nodes'],
      ['Parallel Courses', 'parallel-courses', 'M', 'P2', 'G/A', 'Level = semesters', 'BFS layers count minimum semesters'],
      ['Find Eventual Safe States', 'find-eventual-safe-states', 'M', 'P2', 'G/A/M', 'Reverse graph + indegree', 'Safe nodes reach only terminal nodes'],
      ['Sort Items by Groups Respecting Dependencies', 'sort-items-by-groups-respecting-dependencies', 'H', 'P3', 'G/A', 'Two-level topo sort', 'Order groups, then items within groups'],
      ['Build a Matrix With Conditions', 'build-a-matrix-with-conditions', 'H', 'P3', 'G', 'Topo rows and columns', 'Independent orderings place each value'],
      ['Longest Increasing Path in a Matrix', 'longest-increasing-path-in-a-matrix', 'H', 'P1', 'G/A/M/Ap', 'DFS memo on DAG', 'Cells form a DAG by increasing value'],
    ],
  },
  {
    id: 'tree-dp-paths', number: 14, name: 'Tree DP & Paths', priority: 'P1',
    time: 'O(n)', space: 'O(h)',
    whenToUse: 'Aggregate information up a tree: path sums, diameters, subtree properties.',
    triggers: ['tree path / diameter', 'aggregate over subtrees', 'return-value vs global-best split'],
    coreIdea: 'Post-order DFS: each node combines child results, returning one value while updating a global best.',
    template: `def tree_dp(root):
    best = float('-inf')
    def dfs(node):
        nonlocal best
        if not node: return 0
        l = max(dfs(node.left), 0)
        r = max(dfs(node.right), 0)
        best = max(best, node.val + l + r)   # split at node
        return node.val + max(l, r)          # extend upward
    dfs(root)
    return best`,
    problems: [
      ['Binary Tree Maximum Path Sum', 'binary-tree-maximum-path-sum', 'H', 'P1', 'G/A/M/Ap/Ms', 'Split vs extend', 'Return best single arm, record best split'],
      ['Diameter of Binary Tree', 'diameter-of-binary-tree', 'E', 'P1', 'G/A/M/Ap/Ms', 'Left height + right height', 'Diameter through node = l + r'],
      ['Lowest Common Ancestor of a Binary Tree', 'lowest-common-ancestor-of-a-binary-tree', 'M', 'P1', 'G/A/M/Ap/Ms', 'Return node when both sides found', 'LCA is where the two searches split'],
      ['Path Sum III', 'path-sum-iii', 'M', 'P1', 'G/A/M', 'Prefix sums along path', 'Count prefix sums equal to running-target'],
      ['House Robber III', 'house-robber-iii', 'M', 'P1', 'G/A/M', 'Rob vs skip per node', 'Return (rob, skip) pair up the tree'],
      ['Count Good Nodes in Binary Tree', 'count-good-nodes-in-binary-tree', 'M', 'P2', 'G/A/M', 'Carry max-so-far down', 'Good iff value >= max on the path'],
      ['Binary Tree Cameras', 'binary-tree-cameras', 'H', 'P3', 'G/A', 'Greedy state per node', 'Cover parents from children, place minimally'],
      ['Longest Univalue Path', 'longest-univalue-path', 'M', 'P2', 'G/A', 'Extend equal-value arms', 'Only extend when child value matches'],
      ['Distribute Coins in Binary Tree', 'distribute-coins-in-binary-tree', 'M', 'P2', 'G/A', 'Flow excess up edges', 'Moves = sum of |balance| on each edge'],
      ['Maximum Sum BST in Binary Tree', 'maximum-sum-bst-in-binary-tree', 'H', 'P3', 'G/A', 'Return (isBST,min,max,sum)', 'Bubble validity and bounds upward'],
    ],
  },
  {
    id: 'greedy', number: 15, name: 'Greedy', priority: 'P1',
    time: 'O(n log n)', space: 'O(1)',
    whenToUse: 'Local optimal choice leads to a global optimum: scheduling, intervals, jump games.',
    triggers: ['maximize/minimize with a local rule', 'sort then sweep', 'jump / reach / cover'],
    coreIdea: 'Prove an exchange argument, then make the greedy choice at each step without reconsidering.',
    template: `def greedy(items):
    items.sort(key=chosen_key)
    result = 0
    for it in items:
        if feasible(it):
            take(it); result += value(it)
    return result`,
    problems: [
      ['Jump Game', 'jump-game', 'M', 'P1', 'G/A/M/Ap/Ms', 'Track furthest reach', 'Reachable if reach never falls behind i'],
      ['Jump Game II', 'jump-game-ii', 'M', 'P1', 'G/A/M/Ap', 'Greedy BFS layers', 'Extend jump only at the current range end'],
      ['Gas Station', 'gas-station', 'M', 'P1', 'G/A/M/Ap', 'Reset start on deficit', 'If total >= 0 a unique start exists'],
      ['Partition Labels', 'partition-labels', 'M', 'P1', 'G/A/M/Ap', 'Extend to last index of char', 'Cut when i reaches the running max end'],
      ['Task Scheduler', 'task-scheduler', 'M', 'P1', 'G/A/M', 'Fill idle by frequency', 'Most frequent task sets the frame'],
      ['Merge Triplets to Form Target Triplet', 'merge-triplets-to-form-target-triplet', 'M', 'P2', 'G/A', 'Only use non-exceeding triplets', 'Keep triplets that never overshoot target'],
      ['Hand of Straights', 'hand-of-straights', 'M', 'P2', 'G/A', 'Greedily start from smallest', 'Smallest card must begin a group'],
      ['Valid Parenthesis String', 'valid-parenthesis-string', 'M', 'P2', 'G/A/M', 'Track open range low..high', 'Star widens the possible open-count range'],
      ['Candy', 'candy', 'H', 'P2', 'G/A/Ap', 'Two passes L-to-R, R-to-L', 'Satisfy both neighbor directions'],
      ['Minimum Number of Refueling Stops', 'minimum-number-of-refueling-stops', 'H', 'P3', 'G/A', 'Heap of passed fuel', 'Retroactively use the biggest available tank'],
    ],
  },
  {
    id: 'graph-shortest-mst', number: 16, name: 'Graph (Shortest Path & MST)', priority: 'P1',
    time: 'O(E log V)', space: 'O(V+E)',
    whenToUse: 'Weighted shortest paths (Dijkstra/Bellman-Ford) or minimum spanning trees (Prim/Kruskal).',
    triggers: ['weighted shortest path', 'min cost to connect all', 'cheapest / fastest route'],
    coreIdea: 'Dijkstra greedily settles the nearest node via a min-heap; MST connects all nodes at minimum total weight.',
    template: `import heapq
def dijkstra(graph, src):
    dist = {src: 0}; pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, float('inf')): continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist.get(v, float('inf')):
                dist[v] = nd; heapq.heappush(pq, (nd, v))
    return dist`,
    problems: [
      ['Network Delay Time', 'network-delay-time', 'M', 'P1', 'G/A/M/Ms', 'Dijkstra from source', 'Answer is the max settled distance'],
      ['Cheapest Flights Within K Stops', 'cheapest-flights-within-k-stops', 'M', 'P1', 'G/A/M/Ap', 'Bellman-Ford k+1 rounds', 'Relax edges only k+1 times'],
      ['Path With Minimum Effort', 'path-with-minimum-effort', 'M', 'P1', 'G/A/M', 'Dijkstra on max-edge cost', 'Minimize the maximum step difference'],
      ['Swim in Rising Water', 'swim-in-rising-water', 'H', 'P2', 'G/A/M', 'Dijkstra / min-max path', 'Cost of a path is its highest cell'],
      ['Min Cost to Connect All Points', 'min-cost-to-connect-all-points', 'M', 'P1', 'G/A/M/Ap', "Prim's or Kruskal's MST", 'Manhattan distances as candidate edges'],
      ['Connecting Cities With Minimum Cost', 'connecting-cities-with-minimum-cost', 'M', 'P2', 'G/A', 'Kruskal with union-find', 'Add cheapest edges avoiding cycles'],
      ['Path with Maximum Probability', 'path-with-maximum-probability', 'M', 'P2', 'G/A', 'Dijkstra maximizing product', 'Use a max-heap on probability'],
      ['Find the City With the Smallest Number of Neighbors at a Threshold Distance', 'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance', 'M', 'P2', 'G/A', 'Floyd-Warshall all-pairs', 'n^3 all-pairs then count reachable'],
      ['The Maze II', 'the-maze-ii', 'M', 'P3', 'G/A', 'Dijkstra with rolling distance', 'Ball rolls until it hits a wall'],
      ['Reachable Nodes In Subdivided Graph', 'reachable-nodes-in-subdivided-graph', 'H', 'P3', 'G', 'Dijkstra + edge budgets', 'Count subdivided nodes reached along edges'],
    ],
  },
  {
    id: 'prefix-sum', number: 17, name: 'Prefix Sum', priority: 'P1',
    time: 'O(n)', space: 'O(n)',
    whenToUse: 'Range sums, subarray counts with a target sum, or running aggregates.',
    triggers: ['subarray sum equals k', 'range sum queries', 'count/balance running total'],
    coreIdea: 'Store cumulative sums; a subarray sum is a difference of two prefixes, so hash prefixes to count targets.',
    template: `def subarray_sum(nums, k):
    count = 0; run = 0
    seen = {0: 1}                       # prefix -> frequency
    for x in nums:
        run += x
        count += seen.get(run - k, 0)
        seen[run] = seen.get(run, 0) + 1
    return count`,
    problems: [
      ['Subarray Sum Equals K', 'subarray-sum-equals-k', 'M', 'P1', 'G/A/M/Ap/Ms', 'Hash prefix sums', 'Look for prefix run-k already seen'],
      ['Range Sum Query - Immutable', 'range-sum-query-immutable', 'E', 'P1', 'G/A/M', 'Precompute prefixes', 'sum(i,j) = pre[j+1] - pre[i]'],
      ['Contiguous Array', 'contiguous-array', 'M', 'P1', 'G/A/M/Ms', 'Map 0 to -1, find balance', 'Equal 0s and 1s = zero running balance'],
      ['Product of Array Except Self', 'product-of-array-except-self', 'M', 'P1', 'G/A/M/Ap/Ms', 'Prefix and suffix products', 'Multiply left and right products, no division'],
      ['Find Pivot Index', 'find-pivot-index', 'E', 'P2', 'G/A/M', 'Left sum vs right sum', 'Pivot where left == total-left-self'],
      ['Subarray Sums Divisible by K', 'subarray-sums-divisible-by-k', 'M', 'P2', 'G/A', 'Count prefix remainders', 'Equal remainders bound a divisible subarray'],
      ['Continuous Subarray Sum', 'continuous-subarray-sum', 'M', 'P2', 'G/A/M', 'Remainder-first-seen index', 'Same remainder twice means multiple of k'],
      ['Maximum Size Subarray Sum Equals k', 'maximum-size-subarray-sum-equals-k', 'M', 'P2', 'G/A/M', 'Earliest prefix index map', 'Longest span between matching prefixes'],
      ['Range Sum Query 2D - Immutable', 'range-sum-query-2d-immutable', 'M', 'P2', 'G/A/M', '2D prefix inclusion-exclusion', 'Combine four corner prefixes'],
      ['Minimum Value to Get Positive Step by Step Sum', 'minimum-value-to-get-positive-step-by-step-sum', 'E', 'P3', 'A', 'Track minimum prefix', 'Start value = 1 - min prefix'],
    ],
  },
  {
    id: 'bit-manipulation', number: 18, name: 'Bit Manipulation', priority: 'P2',
    time: 'O(n)', space: 'O(1)',
    whenToUse: 'XOR tricks, counting/toggling bits, subset masks, and constant-space uniqueness.',
    triggers: ['single/missing number', 'count set bits', 'subsets via masks / XOR properties'],
    coreIdea: 'Exploit bit identities: x^x=0, x&(x-1) clears lowest set bit, masks enumerate subsets.',
    template: `def count_bits(x):
    count = 0
    while x:
        x &= x - 1                      # drop lowest set bit
        count += 1
    return count`,
    problems: [
      ['Single Number', 'single-number', 'E', 'P1', 'G/A/M/Ap/Ms', 'XOR everything', 'Pairs cancel, the loner survives'],
      ['Number of 1 Bits', 'number-of-1-bits', 'E', 'P1', 'G/A/M/Ap', 'Kernighan bit drop', 'x & (x-1) removes lowest 1'],
      ['Counting Bits', 'counting-bits', 'E', 'P1', 'G/A/M/Ap', 'DP on x>>1', 'bits[x] = bits[x>>1] + (x&1)'],
      ['Missing Number', 'missing-number', 'E', 'P1', 'G/A/M/Ms', 'XOR indices and values', 'XOR of full range cancels present ones'],
      ['Reverse Bits', 'reverse-bits', 'E', 'P2', 'A/Ap/Ms', 'Shift out, shift in', 'Build result bit by bit from the right'],
      ['Sum of Two Integers', 'sum-of-two-integers', 'M', 'P2', 'G/A/M', 'XOR sum + carry shift', 'Carry = (a&b)<<1, loop until zero'],
      ['Single Number II', 'single-number-ii', 'M', 'P2', 'G/A/M', 'Bit-count mod 3', 'Each bit appears a multiple of 3 plus loner'],
      ['Single Number III', 'single-number-iii', 'M', 'P2', 'G/A', 'Split by a differing bit', 'Lowest set bit of XOR partitions the two'],
      ['Bitwise AND of Numbers Range', 'bitwise-and-of-numbers-range', 'M', 'P2', 'G/A', 'Common prefix of range', 'Shift both until they match'],
      ['Subsets', 'subsets', 'M', 'P1', 'G/A/M/Ap/Ms', 'Iterate mask 0..2^n', 'Bit j set means include element j'],
    ],
  },
  {
    id: 'design-ds', number: 19, name: 'Design & Data Structures', priority: 'P1',
    time: 'O(1) amort.', space: 'O(n)',
    whenToUse: 'Build a class with specific time guarantees: caches, iterators, rate limiters, structures.',
    triggers: ['design a class', 'O(1) get/put', 'combine hashmap + list/heap/linkedlist'],
    coreIdea: 'Compose primitives (hashmap for O(1) lookup, linked list/heap for order) to meet the required complexities.',
    template: `class LRUCache:                     # dict + doubly linked list
    def __init__(self, cap):
        self.cap = cap
        self.cache = OrderedDict()
    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key, val):
        self.cache[key] = val
        self.cache.move_to_end(key)
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
    problems: [
      ['LRU Cache', 'lru-cache', 'M', 'P1', 'G/A/M/Ap/Ms', 'Hashmap + doubly linked list', 'Move to front on use, evict the tail'],
      ['LFU Cache', 'lfu-cache', 'H', 'P1', 'G/A/M/Ap', 'Freq buckets of ordered maps', 'Track min frequency for O(1) evict'],
      ['Min Stack', 'min-stack', 'M', 'P1', 'G/A/M/Ap/Ms', 'Stack of running minimums', 'Push the current min alongside each value'],
      ['Implement Queue using Stacks', 'implement-queue-using-stacks', 'E', 'P1', 'G/A/M/Ms', 'In-stack and out-stack', 'Amortized O(1) by lazy transfer'],
      ['Insert Delete GetRandom O(1)', 'insert-delete-getrandom-o1', 'M', 'P1', 'G/A/M/Ms', 'Array + index map', 'Swap-with-last for O(1) delete'],
      ['Design Twitter', 'design-twitter', 'M', 'P2', 'G/A/M/Ap', 'Merge k feeds by time', 'Heap the followees latest tweets'],
      ['Design Hit Counter', 'design-hit-counter', 'M', 'P2', 'G/A/M', 'Sliding 300s window', 'Drop timestamps older than the window'],
      ['Serialize and Deserialize Binary Tree', 'serialize-and-deserialize-binary-tree', 'H', 'P1', 'G/A/M/Ap/Ms', 'Preorder with null markers', 'Reconstruct recursively from the stream'],
      ['Design Circular Queue', 'design-circular-queue', 'M', 'P2', 'A/M', 'Fixed array with head/tail', 'Wrap indices modulo capacity'],
      ['Flatten Nested List Iterator', 'flatten-nested-list-iterator', 'M', 'P2', 'G/A/M', 'Stack of iterators', 'Lazily unwrap nesting on next()'],
    ],
  },
  {
    id: 'matrix-grid', number: 20, name: 'Matrix & Grid', priority: 'P1',
    time: 'O(m·n)', space: 'O(m·n)',
    whenToUse: '2D traversal, in-place transforms, flood fill, and boundary-driven problems.',
    triggers: ['2D grid / matrix', 'rotate / spiral / set zeroes', 'regions and boundaries'],
    coreIdea: 'Treat the grid as a graph or apply layer/coordinate math; watch for in-place constraints.',
    template: `def flood_fill(grid, r, c, target, color):
    if r<0 or c<0 or r>=len(grid) or c>=len(grid[0]): return
    if grid[r][c] != target: return
    grid[r][c] = color
    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
        flood_fill(grid, r+dr, c+dc, target, color)`,
    problems: [
      ['Rotate Image', 'rotate-image', 'M', 'P1', 'G/A/M/Ap/Ms', 'Transpose then reverse rows', 'In-place 90-degree via two flips'],
      ['Spiral Matrix', 'spiral-matrix', 'M', 'P1', 'G/A/M/Ap/Ms', 'Shrinking boundaries', 'Peel top,right,bottom,left in turn'],
      ['Set Matrix Zeroes', 'set-matrix-zeroes', 'M', 'P1', 'G/A/M/Ap/Ms', 'Use first row/col as flags', 'Mark in-place, zero after scanning'],
      ['Word Search', 'word-search', 'M', 'P1', 'G/A/M/Ap/Ms', 'DFS with backtracking', 'Mark visited, recurse, restore'],
      ['Number of Islands', 'number-of-islands', 'M', 'P1', 'G/A/M/Ap/Ms', 'Flood fill components', 'Sink each island as you count'],
      ['Surrounded Regions', 'surrounded-regions', 'M', 'P1', 'G/A/M', 'Mark border-connected O', 'Only enclosed Os get flipped'],
      ['Pacific Atlantic Water Flow', 'pacific-atlantic-water-flow', 'M', 'P1', 'G/A/M/Ap', 'DFS inward from oceans', 'Reachable from both = answer'],
      ['Game of Life', 'game-of-life', 'M', 'P2', 'G/A/M/Ap', 'Encode two states per cell', 'Use extra bit to update in place'],
      ['Spiral Matrix II', 'spiral-matrix-ii', 'M', 'P2', 'G/A', 'Fill 1..n^2 spirally', 'Same boundary shrink, writing values'],
      ['Diagonal Traverse', 'diagonal-traverse', 'M', 'P2', 'G/A/M', 'Alternate diagonal direction', 'Flip walk direction per anti-diagonal'],
    ],
  },
  {
    id: 'advanced-dp', number: 21, name: 'Advanced DP (Interval/Bitmask/State Machine)', priority: 'P2',
    time: 'O(n^2)-O(n·2^n)', space: 'O(n^2)',
    whenToUse: 'Interval merging DP, subset/bitmask DP, or buy/sell state-machine DP.',
    triggers: ['interval / burst / merge cost', 'assign to subsets (bitmask)', 'buy/sell with states & cooldown'],
    coreIdea: 'State includes structure (interval endpoints, a bitmask of used items, or a machine state) beyond a single index.',
    template: `def interval_dp(a):
    n = len(a); dp = [[0]*n for _ in range(n)]
    for length in range(2, n+1):
        for i in range(n-length+1):
            j = i+length-1
            dp[i][j] = min(dp[i][k]+dp[k+1][j]+cost(i,k,j)
                           for k in range(i, j))
    return dp[0][n-1]`,
    problems: [
      ['Best Time to Buy and Sell Stock', 'best-time-to-buy-and-sell-stock', 'E', 'P1', 'G/A/M/Ap/Ms', 'Track min price so far', 'Max profit = price - running min'],
      ['Best Time to Buy and Sell Stock with Cooldown', 'best-time-to-buy-and-sell-stock-with-cooldown', 'M', 'P1', 'G/A/M', 'Hold/sold/rest states', 'State machine transitions each day'],
      ['Burst Balloons', 'burst-balloons', 'H', 'P1', 'G/A/M', 'Interval DP, last to burst', 'Choose the last balloon in each range'],
      ['Partition Equal Subset Sum', 'partition-equal-subset-sum', 'M', 'P1', 'G/A/M', 'Subset-sum knapsack', 'Boolean reachability to sum/2'],
      ['Regular Expression Matching', 'regular-expression-matching', 'H', 'P1', 'G/A/M/Ap', '2D match DP with star', 'Star matches zero or extends prior char'],
      ['Wildcard Matching', 'wildcard-matching', 'H', 'P2', 'G/A/M', 'Star matches any span', 'Track last star for backtracking'],
      ['Minimum Cost to Cut a Stick', 'minimum-cost-to-cut-a-stick', 'H', 'P2', 'G/A', 'Interval DP over cut points', 'Cost = segment length + subproblems'],
      ['Partition to K Equal Sum Subsets', 'partition-to-k-equal-sum-subsets', 'M', 'P2', 'G/A/M', 'Bitmask over used elements', 'DP on subset fill toward target'],
      ['Stone Game', 'stone-game', 'M', 'P2', 'G/A', 'Minimax interval DP', 'Optimize the score difference'],
      ['Best Time to Buy and Sell Stock III', 'best-time-to-buy-and-sell-stock-iii', 'H', 'P2', 'G/A/M', 'At most two transactions', 'Track four states buy1/sell1/buy2/sell2'],
    ],
  },
  {
    id: 'math-number-theory', number: 22, name: 'Math & Number Theory', priority: 'P2',
    time: 'varies', space: 'O(1)',
    whenToUse: 'Primes, gcd/lcm, modular arithmetic, digit manipulation, and combinatorics.',
    triggers: ['primes / factors / gcd', 'modular / overflow-safe math', 'digits / power / roots'],
    coreIdea: 'Apply number-theory identities (sieve, Euclid, fast exponentiation) instead of brute force.',
    template: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def sieve(n):
    is_p = [True]*(n+1); is_p[0]=is_p[1]=False
    for i in range(2, int(n**0.5)+1):
        if is_p[i]:
            for j in range(i*i, n+1, i): is_p[j] = False
    return [i for i in range(n+1) if is_p[i]]`,
    problems: [
      ['Count Primes', 'count-primes', 'M', 'P1', 'G/A/M/Ms', 'Sieve of Eratosthenes', 'Cross out multiples from i*i'],
      ['Pow(x, n)', 'powx-n', 'M', 'P1', 'G/A/M/Ap/Ms', 'Fast exponentiation', 'Square the base, halve the exponent'],
      ['Sqrt(x)', 'sqrtx', 'E', 'P1', 'G/A/M/Ap', 'Binary search the root', 'Largest m with m*m <= x'],
      ['Happy Number', 'happy-number', 'E', 'P1', 'G/A/Ap', 'Cycle in digit-square sums', 'Detect loop or reaching 1'],
      ['Excel Sheet Column Number', 'excel-sheet-column-number', 'E', 'P2', 'G/A/M', 'Base-26 conversion', 'Accumulate value * 26 + digit'],
      ['Factorial Trailing Zeroes', 'factorial-trailing-zeroes', 'M', 'P2', 'G/A/M', 'Count factors of 5', 'Zeros come from 5*2 pairs'],
      ['Ugly Number II', 'ugly-number-ii', 'M', 'P2', 'G/A/M', 'Three merge pointers', 'Next ugly = min of 2x,3x,5x heads'],
      ['Integer to Roman', 'integer-to-roman', 'M', 'P2', 'G/A/M/Ap', 'Greedy value table', 'Subtract largest symbol repeatedly'],
      ['Multiply Strings', 'multiply-strings', 'M', 'P2', 'G/A/M/Ap', 'Grade-school multiply', 'digit i*j lands at position i+j'],
      ['Rotate Function', 'rotate-function', 'M', 'P3', 'A', 'Recurrence between rotations', 'F(k) = F(k-1) + sum - n*last'],
    ],
  },
  {
    id: 'segment-fenwick', number: 23, name: 'Segment / Fenwick Tree', priority: 'P2',
    time: 'O(log n)', space: 'O(n)',
    whenToUse: 'Range queries with point/range updates: sums, mins, counts of smaller elements.',
    triggers: ['range query + updates', 'count inversions / smaller after', 'prefix aggregates that change'],
    coreIdea: 'A binary-indexed or segment tree gives O(log n) range queries and updates simultaneously.',
    template: `class BIT:                          # Fenwick, 1-indexed
    def __init__(self, n): self.t = [0]*(n+1)
    def update(self, i, delta):
        while i < len(self.t):
            self.t[i] += delta; i += i & (-i)
    def query(self, i):                 # prefix sum [1..i]
        s = 0
        while i > 0:
            s += self.t[i]; i -= i & (-i)
        return s`,
    problems: [
      ['Range Sum Query - Mutable', 'range-sum-query-mutable', 'M', 'P1', 'G/A/M/Ms', 'Fenwick or segment tree', 'Point update, prefix-sum query'],
      ['Count of Smaller Numbers After Self', 'count-of-smaller-numbers-after-self', 'H', 'P1', 'G/A/M', 'BIT over compressed ranks', 'Query count below as you scan right to left'],
      ['Reverse Pairs', 'reverse-pairs', 'H', 'P2', 'G/A/M', 'BIT / merge sort count', 'Count i<j with a[i] > 2*a[j]'],
      ['Count of Range Sum', 'count-of-range-sum', 'H', 'P2', 'G/A', 'Prefix sums + BIT', 'Count prefixes in [lower,upper] band'],
      ['The Skyline Problem', 'the-skyline-problem', 'H', 'P2', 'G/A/M/Ms', 'Sweep with a heap', 'Track current max height at events'],
      ['Range Sum Query 2D - Mutable', 'range-sum-query-2d-mutable', 'H', 'P3', 'G/A', '2D Fenwick tree', 'BIT indexed on both dimensions'],
      ['My Calendar III', 'my-calendar-iii', 'H', 'P3', 'G/A', 'Sweep-line max overlap', 'Difference counts on a timeline'],
      ['Falling Squares', 'falling-squares', 'H', 'P3', 'G/A', 'Segment tree with lazy max', 'Range max under each dropped square'],
      ['Number of Longest Increasing Subsequence', 'number-of-longest-increasing-subsequence', 'M', 'P2', 'G/A/M', 'DP tracking length+count', 'Fenwick can speed the counting'],
      ['Longest Increasing Subsequence II', 'longest-increasing-subsequence-ii', 'H', 'P3', 'G', 'Segment tree max query', 'Query best LIS within a value window'],
    ],
  },
  {
    id: 'two-heaps-kway', number: 24, name: 'Two Heaps & K-Way Merge', priority: 'P2',
    time: 'O(n log k)', space: 'O(k)',
    whenToUse: 'Running median (two heaps) or merging k sorted sequences.',
    triggers: ['running median / balanced halves', 'merge k sorted', 'kth smallest across sorted rows'],
    coreIdea: 'Two heaps balance a stream around the middle; a single heap merges k sorted sources by always taking the smallest head.',
    template: `import heapq
def merge_k(lists):
    heap = [(l[0], i, 0) for i, l in enumerate(lists) if l]
    heapq.heapify(heap); out = []
    while heap:
        val, li, idx = heapq.heappop(heap)
        out.append(val)
        if idx+1 < len(lists[li]):
            heapq.heappush(heap, (lists[li][idx+1], li, idx+1))
    return out`,
    problems: [
      ['Find Median from Data Stream', 'find-median-from-data-stream', 'H', 'P1', 'G/A/M/Ap/Ms', 'Max-heap low, min-heap high', 'Rebalance so sizes differ by <=1'],
      ['Merge k Sorted Lists', 'merge-k-sorted-lists', 'H', 'P1', 'G/A/M/Ap/Ms', 'Heap of current heads', 'Pop min, push its successor'],
      ['Kth Smallest Element in a Sorted Matrix', 'kth-smallest-element-in-a-sorted-matrix', 'M', 'P1', 'G/A/M/Ap', 'Heap or binary search value', 'Count elements <= mid to binary-search'],
      ['Smallest Range Covering Elements from K Lists', 'smallest-range-covering-elements-from-k-lists', 'H', 'P2', 'G/A/M', 'Heap min, track max', 'Advance the list holding the minimum'],
      ['Find K Pairs with Smallest Sums', 'find-k-pairs-with-smallest-sums', 'M', 'P2', 'G/A/M', 'Heap of candidate pairs', 'Expand neighbors of popped pair'],
      ['Sliding Window Median', 'sliding-window-median', 'H', 'P2', 'G/A/M', 'Two heaps with lazy delete', 'Balance halves while sliding'],
      ['IPO', 'ipo', 'H', 'P2', 'G/A', 'Max-heap of affordable profits', 'Unlock projects by capital, take best profit'],
      ['Merge Sorted Array', 'merge-sorted-array', 'E', 'P1', 'G/A/M/Ap/Ms', 'Merge from the back', 'Write largest first to avoid overwrite'],
      ['Kth Smallest Number in Multiplication Table', 'kth-smallest-number-in-multiplication-table', 'H', 'P3', 'G/A', 'Binary search the value', 'Count entries <= mid per row'],
      ['Find the Kth Smallest Sum of a Matrix With Sorted Rows', 'find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows', 'H', 'P3', 'G', 'Incremental k-way merge', 'Keep only k best partial sums per row'],
    ],
  },
  {
    id: 'recursion-dc', number: 25, name: 'Recursion & Divide and Conquer', priority: 'P2',
    time: 'O(n log n)', space: 'O(log n)',
    whenToUse: 'Split a problem into independent subproblems and combine, or recurse over structure.',
    triggers: ['divide into halves and combine', 'build/traverse recursively', 'sort / count via merge'],
    coreIdea: 'Break into subproblems, solve each recursively, and merge the results; base case terminates.',
    template: `def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)           # combine step`,
    problems: [
      ['Merge Sort / Sort an Array', 'sort-an-array', 'M', 'P1', 'G/A/M/Ms', 'Divide, sort, merge', 'Stable O(n log n) via merge'],
      ['Kth Largest Element in an Array', 'kth-largest-element-in-an-array', 'M', 'P1', 'G/A/M/Ap/Ms', 'Quickselect partition', 'Recurse into only one side'],
      ['Construct Binary Tree from Preorder and Inorder Traversal', 'construct-binary-tree-from-preorder-and-inorder-traversal', 'M', 'P1', 'G/A/M/Ap/Ms', 'Root splits inorder', 'Left/right sizes from inorder index'],
      ['Convert Sorted Array to Binary Search Tree', 'convert-sorted-array-to-binary-search-tree', 'E', 'P1', 'G/A/M', 'Pick middle as root', 'Balanced by choosing the median'],
      ['Different Ways to Add Parentheses', 'different-ways-to-add-parentheses', 'M', 'P2', 'G/A', 'Split at each operator', 'Combine results of left and right groups'],
      ['Beautiful Array', 'beautiful-array', 'M', 'P3', 'G/A', 'Odd/even divide and conquer', 'Build from smaller beautiful arrays'],
      ['Search a 2D Matrix II', 'search-a-2d-matrix-ii', 'M', 'P1', 'G/A/M/Ap', 'Start at top-right corner', 'Eliminate a row or column each step'],
      ['Majority Element', 'majority-element', 'E', 'P1', 'G/A/M/Ap', 'Boyer-Moore voting', 'Cancel out non-majority pairs'],
      ['Count of Smaller Numbers After Self', 'count-of-smaller-numbers-after-self', 'H', 'P2', 'G/A/M', 'Merge sort counting', 'Count crossings during the merge'],
      ['The Skyline Problem', 'the-skyline-problem', 'H', 'P2', 'G/A/M/Ms', 'Divide and merge skylines', 'Merge two skylines like merge sort'],
    ],
  },
];
