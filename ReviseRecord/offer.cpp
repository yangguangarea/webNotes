#include <iostream>
#include <vector>
#include <map>
#include <stack>
#include <list>
#include <set>
#include <cmath>
#include <unordered_set>
using namespace std;



//---------------------------------------------

// 14. 不修改数组找出重复的数字

// 给定一个长度为 n+1 的数组nums，数组中所有的数均在 1∼n 的范围内，其中 n≥1。

// 请找出数组中任意一个重复的数，但不能修改输入的数组。

// 样例
// 给定 nums = [2, 3, 5, 4, 3, 2, 6, 7]。

// 返回 2 或 3。
// 思考题：如果只能使用 O(1) 的额外空间，该怎么做呢？
// class Solution {
// public:
//     int duplicateInArray(vector<int>& nums) {
//         int left = 1; 
//         int right = nums.size() -1;
//         while(left < right){
//             int mid = right + left >> 1;
//             int count = 0;
//             for(int i = 0; i < nums.size(); i++){
//                 if(nums[i] >= left && nums[i] <= mid){
//                     count ++;
//                 }
//             }
//             if(count > mid - left +1){
//                 right = mid;
//             } else {
//                 left = mid + 1;
//             }
//         }
//         return left;
//     }
// };

//---------------------------------------------

// 15. 二维数组中的查找

// 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。

// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 样例
// 输入数组：

// [
//   [1,2,8,9]，
//   [2,4,9,12]，
//   [4,7,10,13]，
//   [6,8,11,15]
// ]

// 如果输入查找数值为7，则返回true，

// 如果输入查找数值为5，则返回false。

// class Solution {
// public:
//     bool searchArray(vector<vector<int>> array, int target) {
//         if(array.empty() || array[0].empty()){
//             return false;
//         }
//         int row = array.size();
//         int column = array[0].size();

//         int i = 0;
//         int j = column - 1;
//         while(i < row && j >= 0){
            
//             if(array[i][j] == target){
//                 return true;
//             } else if(array[i][j] > target){
//                 j--;
//             } else {
//                 i++;
//             }
//         }
//         return false;
//     }
// };
//---------------------------------------------

// 16. 替换空格

// 请实现一个函数，把字符串中的每个空格替换成"%20"。

// 你可以假定输入字符串的长度最大是1000。
// 注意输出字符串的长度可能大于1000。

// 样例
// 输入："We are happy."

// 输出："We%20are%20happy."

// class Solution {
// public:
// //c语言倒序
//     string replaceSpaces(string &str) {
//         string temp = "";
//         for(int i = 0; i < str.length(); i++){
//             if(str[i] == ' ') {
//                 temp = temp + "%20";
//             } else {
//                 temp = temp + str[i];
//             }
//         }
//         return temp;
//     }
// };


//---------------------------------------------
// 17. 从尾到头打印链表

// 输入一个链表的头结点，按照 从尾到头 的顺序返回节点的值。

// 返回的结果用数组存储。

// 样例
// 输入：[2, 3, 5]
// 返回：[5, 3, 2]
// /**
//  * Definition for singly-linked list.
//  * struct ListNode {
//  *     int val;
//  *     ListNode *next;
//  *     ListNode(int x) : val(x), next(NULL) {}
//  * };
//  */
// class Solution {
// public:
//     vector<int> printListReversingly(ListNode* head) {
//         vector<int> put;
//         while(head != NULL){
//             put.push_back(head->val);
//             head = head->next;
//         }
//         int size = put.size();
//         for(int i = 0; i < size / 2; i++){
//             swap(put[i], put[size - 1 - i]);
//         }
//         return put;
//     }
// };

//---------------------------------------------

// 18. 重建二叉树

// 输入一棵二叉树前序遍历和中序遍历的结果，请重建该二叉树。

// 注意:

// 二叉树中每个节点的值都互不相同；
// 输入的前序遍历和中序遍历一定合法；
// 样例
// 给定：
// 前序遍历是：[3, 9, 20, 15, 7]
// 中序遍历是：[9, 3, 15, 20, 7]

// 返回：[3, 9, 20, null, null, 15, 7, null, null, null, null]
// 返回的二叉树如下所示：
//     3
//    / \
//   9  20
//     /  \
//    15   7


// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };
// class Solution {
// public:
//     map<int, int> mInorder;
//     TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
//         TreeNode* pTHead = nullptr;
//         for(int i = 0; i < inorder.size(); i++){
//             mInorder[inorder[i]] = i;
//         }
//         pTHead = DFS(0, preorder.size() - 1, 0, inorder.size() - 1, preorder, inorder);
//         return pTHead;
//     }
//     TreeNode* DFS(int pl, int pr, int il, int ir, vector<int>& preorder, vector<int>& inorder){
//         if(pl > pr){
//             return nullptr;
//         }
//         int k = mInorder[preorder[pl]];//根节点在中序中的值
//         auto pNode = new TreeNode(preorder[pl]);
//         pNode->left = DFS(pl + 1, pl + 1 + k - il - 1, il, k - 1, preorder, inorder);
//         pNode->right = DFS(pl + 1 + k - il, pr, k + 1, ir, preorder, inorder);
//         return pNode;
//     }
// };

//---------------------------------------------
// 19. 二叉树的下一个节点

// 给定一棵二叉树的其中一个节点，请找出中序遍历序列的下一个节点。

// 注意：

// 如果给定的节点是中序遍历序列的最后一个，则返回空节点;
// 二叉树一定不为空，且给定的节点一定不是空节点；
// 样例
// 假定二叉树是：[2, 1, 3, null, null, null, null]， 给出的是值等于2的节点。

// 则应返回值等于3的节点。

// 解释：该二叉树的结构如下，2的后继节点是3。
//   2
//  / \
// 1   3


// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode *father;
//     TreeNode(int x) : val(x), left(NULL), right(NULL), father(NULL) {}
// };
 
// class Solution {
// public:
//     TreeNode* inorderSuccessor(TreeNode* p) {
//         //左根右

//         //如果有右子树，就是右子树的最左边；
//         if(p->right != NULL){
//             TreeNode* pNext = p->right;
//             while(pNext->left){
//                 pNext = pNext->left;
//             }
//             return pNext;
//         }
//         //如果自己是左节点，下一个就是父节点
//         //
//         //父节点的父节点
//         if(p->father != NULL){
//             if(p->father->left == p){
//                 return p->father;
//             } else {
//                 //如果father也是右节点，就一直往上找
//                 while(p->father->father != NULL){
//                     if(p->father != p->father->father->left){
//                         p = p->father;
//                     }
//                 }
//                 return p->father->father;
//             }
//         }
//         return NULL;
//     }
// };

//---------------------------------------------
// 20. 用两个栈实现队列

// 请用栈实现一个队列，支持如下四种操作：

// push(x) – 将元素x插到队尾；
// pop() – 将队首的元素弹出，并返回该元素；
// peek() – 返回队首元素；
// empty() – 返回队列是否为空；
// 注意：

// 你只能使用栈的标准操作：push to top，peek/pop from top, size 和 is empty；
// 如果你选择的编程语言没有栈的标准库，你可以使用list或者deque等模拟栈的操作；
// 输入数据保证合法，例如，在队列为空时，不会进行pop或者peek等操作；
// 样例
// MyQueue queue = new MyQueue();

// queue.push(1);
// queue.push(2);
// queue.peek();  // returns 1
// queue.pop();   // returns 1
// queue.empty(); // returns false

// class MyQueue {
// public:
//     /** Initialize your data structure here. */
//     stack<int> stack1;
//     stack<int> stack2;
//     MyQueue() {
        
//     }
    
//     /** Push element x to the back of queue. */
//     void push(int x) {
//         stack1.push(x);
//     }
    
//     /** Removes the element from in front of queue and returns that element. */
//     int pop() {
//         if(!stack2.empty()){
//             int num = stack2.top();
//             stack2.pop();
//             return num;
//         }
//         while(!stack1.empty()){
//             int num = stack1.top();
//             stack1.pop();
//             stack2.push(num);
//         }
//         int num = stack2.top();
//         stack2.pop();
//         return num;
//     }
    
//     /** Get the front element. */
//     int peek() {
//         if(!stack2.empty()){
//             return stack2.top();
//         }

//         while(!stack1.empty()){
//             int num = stack1.top();
//             stack1.pop();
//             stack2.push(num);
//         }
//         return stack2.top();
//     }
    
//     /** Returns whether the queue is empty. */
//     bool empty() {
//         return stack1.empty() && stack2.empty();
//     }
// };

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * bool param_4 = obj.empty();
 */
//---------------------------------------------
// 21. 斐波那契数列

// 输入一个整数 n ，求斐波那契数列的第 n 项。

// 假定从0开始，第0项为0。(n<=39)

// 样例
// 输入整数 n=5 

// 返回 5

// class Solution {
// public:
//     int Fibonacci(int n) {
//         if(n < 1) return n;
//         int curCount = 1;
//         int preCount = 0;
//         for(int i = 2; i <= n; i++){
//             int count = preCount + curCount;
//             preCount = curCount;
//             curCount = count;
//         }
//         return curCount;
//     }
// };
//---------------------------------------------
// 22. 旋转数组的最小数字

// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

// 输入一个升序的数组的一个旋转，输出旋转数组的最小元素。

// 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。

// 数组可能包含重复项。

// 注意：数组内所含元素非负，若数组大小为0，请返回-1。

// 样例
// 输入：nums=[2,2,2,0,1]

// 输出：0


// class Solution {
// public:
//     int findMin(vector<int>& nums) {
//         //二分查找
//         if(nums.size() == 0) return -1;
//         int left = 0, right = nums.size() - 1;
//         while(left < right){
//             int mid = left + right >> 1;
//             if(nums[mid] == nums[left] && nums[mid] == nums[right]){
//                 int nim = nums[left];
//                 for(int i = left; i <= right; i++){
//                     if(nim > nums[i]){
//                         nim = nums[i];
//                     }
//                 }
//                 return nim;
//             }
//             if(left == right -1){
//                 return (nums[left] < nums[right]) ? nums[left] : nums[right];
//             }
//             //在右侧
//             if(nums[mid] > nums[right]){
//                 left = mid;
//             } else {
//                 right = mid;
//             }
//         }
//         return nums[left];
//     }
// };
//---------------------------------------------
// 23. 矩阵中的路径

// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。

// 路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。

// 如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。

// 注意：

// 输入的路径不为空；
// 所有出现的字符均为大写英文字母；
// 样例
// matrix=
// [
//   ["A","B","C","E"],
//   ["S","F","C","S"],
//   ["A","D","E","E"]
// ]

// str="BCCE" , return "true" 

// str="ASAE" , return "false"

// class Solution {
// public:
//     bool hasPath(vector<vector<char>>& matrix, string &str) {
//         for(int i = 0; i < matrix.size(); i++){
//             for(int j = 0; j < matrix[0].size(); j++){
//                 char c = matrix[i][j];
//                 if(c == str[0]){
//                     bool result = FindPath(matrix, str, 0, i, j);
//                     if(result) return true;
//                 }
//             }            
//         }
//         return false;
//     }
//     bool FindPath(vector<vector<char>>& matrix, string &str, int index, int i, int j){
//         if(index == str.length()){
//             return true;
//         }
//         if(i >= 0 && i < matrix.size() && j >=0 && j < matrix[0].size() && str[index] == matrix[i][j]){
//             matrix[i][j] = '*';

//             bool result = FindPath(matrix, str, index+1, i - 1, j) ||
//                             FindPath(matrix, str, index+1, i, j - 1) ||
//                             FindPath(matrix, str, index+1, i + 1, j) ||
//                             FindPath(matrix, str, index+1, i, j + 1);
//             matrix[i][j] = str[index];
//             return result;
//         }
//         return false;
//     }
// };
//---------------------------------------------
// 24. 机器人的运动范围

// 地上有一个 m 行和 n 列的方格，横纵坐标范围分别是 0∼m−1 和 0∼n−1。

// 一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格。

// 但是不能进入行坐标和列坐标的数位之和大于 k 的格子。

// 请问该机器人能够达到多少个格子？

// 样例1
// 输入：k=7, m=4, n=5

// 输出：20
// 样例2
// 输入：k=18, m=40, n=40

// 输出：1484

// 解释：当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
//       但是，它不能进入方格（35,38），因为3+5+3+8 = 19。
// 注意:

// 0<=m<=50
// 0<=n<=50
// 0<=k<=100
// class Solution {
// public:

//     int movingCount(int threshold, int rows, int cols)
//     {
//         int count = 0;
//         vector<vector<int> >array(rows,vector<int>(cols));
//         int x = 0, y = 0;

//         DFS(threshold, rows, cols, x, y, array, count);
//         return count;
//     }
//     // 0没有走过
//     // 1是走过并且可以通过
//     // 2是不能通过
//     void DFS(int threshold, int rows, int cols, int  x, int y, vector<vector<int> >& array, int& count){
//         if(x >= 0 && x < rows && y >= 0 && y < cols){
//             if(array[x][y] == 0){
//                 if(getNumSum(x) + getNumSum(y) <= threshold){
//                     count++;
//                     array[x][y] = 1;
//                     DFS(threshold, rows, cols, x + 1, y, array, count);
//                     DFS(threshold, rows, cols, x, y + 1, array, count);
//                 } else {
//                     array[x][y] = 2;
//                 }
//             } else if(array[x][y] == 1){
//                 DFS(threshold, rows, cols, x + 1, y, array, count);
//                 DFS(threshold, rows, cols, x, y + 1, array, count);
//             } else {
//                 return; 
//             }
//         }
//     }

//     int getNumSum(int num){
//         int sum = 0;
//         while(num != 0){
//             sum += num % 10;
//             num = num / 10;
//         }
//         return sum;
//     }
// };
//---------------------------------------------
// // 25. 剪绳子
// //    题目
// //    提交记录
// //    讨论
// //    题解
// //    视频讲解

// // 给你一根长度为 n 绳子，请把绳子剪成 m 段（m、n 都是整数，2≤n≤58 并且 m≥2）。

// // 每段的绳子的长度记为k[0]、k[1]、……、k[m]。k[0]k[1] … k[m] 可能的最大乘积是多少？

// // 例如当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到最大的乘积18。

// // 样例
// // 输入：8

// // 输出：18
// class Solution {
// public:
//     int maxProductAfterCutting(int length) {
//         int countThree = length / 3;
//         int countTwo = 0;
//         int yu = length % 3;
//         int result = 1;
//         if(length >= 4){
//             if(yu == 1){
//                 countThree--;
//                 countTwo += 2;
//             } else if(yu == 2){
//                 countTwo++;
//             }
            
//             while(countThree--){
//                 result *= 3;
//             }
//             while(countTwo--){
//                 result *= 2;
//             }
//         } else if(length == 3){
//             result = 2;
//         } else {
//             result = 1;
//         }

//         return result;
//     }
// };
//---------------------------------------------
// 26. 二进制中1的个数
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一个32位整数，输出该数二进制表示中1的个数。

// 注意：

// 负数在计算机中用其绝对值的补码来表示。
// 样例1
// 输入：9
// 输出：2
// 解释：9的二进制表示是1001，一共有2个1。
// 样例2
// 输入：-2
// 输出：31
// 解释：-2在计算机里会被表示成11111111111111111111111111111110，
//       一共有31个

// class Solution {
// public:
//     int NumberOf1(int n) {
//         int result = 0;
//         while(n){
//             n = n & (n-1);
//             result++;
//         }
//         return result;
//     }
// };
//---------------------------------------------
// 27. 数值的整数次方
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 实现函数double Power(double base, int exponent)，求base的 exponent次方。

// 不得使用库函数，同时不需要考虑大数问题。

// 注意：

// 不会出现底数和指数同为0的情况
// 样例1
// 输入：10 ，2

// 输出：100
// 样例2
// 输入：10 ，-2  

// 输出：0.01

// class Solution {
// public:
//     double Power(double base, int exponent) {
//         if(exponent == 0) return 1;
//         if(base == 0) return 0;
//         bool isFu = (exponent < 0) ? true : false;
//         if(isFu) exponent = -exponent;
//         double result = 1;
//         while(exponent--){
//             result *= base; 
//         }
//         if(isFu) result = 1 / result;
//         return result;
//     }
// };
//---------------------------------------------
// 28. 在O(1)时间删除链表结点
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 给定单向链表的一个节点指针，定义一个函数在O(1)时间删除该结点。

// 假设链表一定存在，并且该节点一定不是尾节点。

// 样例
// 输入：链表 1->4->6->8
//       删掉节点：第2个节点即6（头节点为第0个节点）

// 输出：新链表 1->4->8

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

// class Solution {
// public:
//     void deleteNode(ListNode* node) {
//         node->val = node->next->val;
//         auto p = node->next;
//         node->next = node->next->next;
//         delete p;
//     }
// };
//---------------------------------------------
// 29. 删除链表中重复的节点
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留。

// 样例1
// 输入：1->2->3->3->4->4->5

// 输出：1->2->5
// 样例2
// 输入：1->1->1->2->3

// 输出：2->3

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

// class Solution {
// public:
//     ListNode* deleteDuplication(ListNode* head) {
        
//     }
// };

//---------------------------------------------

//---------------------------------------------
// 31. 表示数值的字符串
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。

// 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。

// 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

// 注意:

// 小数可以没有整数部分，例如.123等于0.123；
// 小数点后面可以没有数字，例如233.等于233.0；
// 小数点前面和后面可以有数字，例如233.666;
// 当e或E前面没有数字时，整个字符串不能表示数字，例如.e1、e1；
// 当e或E后面没有整数时，整个字符串不能表示数字，例如12e、12e+5.4;
// 样例：
// 输入: "0"

// 输出: true

// class Solution {
// public:
//     bool isNumber(string s) {
//         int index = 0;
//         while(s[index] != ' ') index++;
//         if(s[index] != '+' && s[index] != '-' && s[index] != '.' && 
//             (s[index] < '0' || s[index] > '9') && s[index] != 'e' && s[index] != 'E') return false;

//         if(s[index] == '+' || s[index] == '-' || s[index] == '.'){
//             if(index + 1 <= s.size() && s[index + 1] < '0' || s[index + 1] > '9') return false;
//         }
//         while(s[index] != ' ') index++;
        

//     }
// };
//---------------------------------------------
// 32. 调整数组顺序使奇数位于偶数前面
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序。

// 使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分。

// 样例
// 输入：[1,2,3,4,5]

// 输出: [1,3,5,2,4]
// class Solution {
// public:
//     void reOrderArray(vector<int> &array) {
//         int i = 0, j = array.size() - 1;
//         while(i < j){
//             while( i <= array.size() -1  && array[i]%2 == 1) i++;
//             while(j >= 0 && array[j]%2 == 0) j--;
//             if(i < j){
//                 int temp = array[i];
//                 array[i] = array[j];
//                 array[j] = temp;
//             }
//         }
//     }
// };

//---------------------------------------------

// 33. 链表中倒数第k个节点
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一个链表，输出该链表中倒数第k个结点。

// 注意：

// k >= 0;
// 如果k大于链表长度，则返回 NULL;
// 样例
// 输入：链表：1->2->3->4->5 ，k=2

// 输出：4

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

// class Solution {
// public:
//     ListNode* findKthToTail(ListNode* pListHead, int k) {
//         ListNode* p1 = pListHead, *p2 = pListHead;
//         int length = k - 1;
//         while(length && p1 != NULL){
//             p1 = p1->next;
//             length--;
//         }
//         if(p1 == NULL) return nullptr;
//         while(p1->next != NULL){
//             p1 = p1->next;
//             p2 = p2->next;
//         }
//         return p2;
//     }
// };
//---------------------------------------------
// 34. 链表中环的入口结点
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 给定一个链表，若其中包含环，则输出环的入口节点。

// 若其中不包含环，则输出null。

// 给定如上所示的链表：
// [1, 2, 3, 4, 5, 6]
// 2
// 注意，这里的2表示编号是2的节点，节点编号从0开始。所以编号是2的节点就是val等于3的节点。

// 则输出环的入口节点3.

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

// class Solution {
// public:
//     ListNode *entryNodeOfLoop(ListNode *head) {
        
//     }
// };
//---------------------------------------------
// 35. 反转链表
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

// 样例
// 输入:1->2->3->4->5->NULL

// 输出:5->4->3->2->1->NULL

// /**
//  * Definition for singly-linked list.
//  * struct ListNode {
//  *     int val;
//  *     ListNode *next;
//  *     ListNode(int x) : val(x), next(NULL) {}
//  * };
//  */
// class Solution {
// public:
//     ListNode* reverseList(ListNode* head) {
//         ListNode* pre = NULL;
//         auto cur = head;
//         while(cur){
//             auto next = cur->next;
//             cur->next = pre;
//             pre = cur;
//             cur = next;
//         }
//         return pre;
//     }
// };
//---------------------------------------------

//---------------------------------------------

//---------------------------------------------
// 37. 树的子结构
// 输入两棵二叉树A，B，判断B是不是A的子结构。

// 我们规定空树不是任何树的子结构。

// 样例
// 树A：

//      8
//     / \
//    8   7
//   / \
//  9   2
//     / \
//    4   7
// 树B：

//    8
//   / \
//  9   2
// 返回 true ,因为B是A的子结构。

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };
// class Solution {
// public:
//     bool hasSubtree(TreeNode* pRoot1, TreeNode* pRoot2) {
//         if(pRoot1 == NULL || pRoot2 == NULL) return false;

//         bool result = false;
//         if(pRoot1->val == pRoot2->val){
//             result = judgeIsChild(pRoot1, pRoot2);
//         } 
//         if(!result) {
//             return (hasSubtree(pRoot1->left, pRoot2) || hasSubtree(pRoot1->right, pRoot2));
//         }
//         return result;
//     }
//     bool judgeIsChild(TreeNode* pRoot1, TreeNode* pRoot2){
//         if(pRoot2 == NULL) return true;
//         if(pRoot1 == NULL) return false;
//         if(pRoot1->val == pRoot2->val){
//             return (judgeIsChild(pRoot1->left, pRoot2->left) && judgeIsChild(pRoot1->right, pRoot2->right));
//         } else {
//             return false;
//         }
//     }
// };


//---------------------------------------------
// 38. 二叉树的镜像
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一个二叉树，将它变换为它的镜像。

// 样例
// 输入树：
//       8
//      / \
//     6  10
//    / \ / \
//   5  7 9 11

//  [8,6,10,5,7,9,11,null,null,null,null,null,null,null,null] 
// 输出树：
//       8
//      / \
//     10  6
//    / \ / \
//   11 9 7  5

//  [8,10,6,11,9,7,5,null,null,null,null,null,null,null,null]

//  /**
//  * Definition for a binary tree node.
//  * struct TreeNode {
//  *     int val;
//  *     TreeNode *left;
//  *     TreeNode *right;
//  *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
//  * };
//  */
// class Solution {
// public:
//     void mirror(TreeNode* root) {
//         if(!root){
//             return ;
//         }
//         mirror(root->left);
//         mirror(root->right);
//         swap(root->left, root->right);
//     }
// };
//---------------------------------------------
// 39. 对称的二叉树
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 请实现一个函数，用来判断一棵二叉树是不是对称的。

// 如果一棵二叉树和它的镜像一样，那么它是对称的。

// 样例
// 如下图所示二叉树[1,2,2,3,4,4,3,null,null,null,null,null,null,null,null]为对称二叉树：
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3

// 如下图所示二叉树[1,2,2,null,4,4,3,null,null,null,null,null,null]不是对称二叉树：
//     1
//    / \
//   2   2
//    \ / \
//    4 4  3

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

// class Solution {
// public:
//     bool isSymmetric(TreeNode* root) {
        
//     }
// };
//---------------------------------------------

//---------------------------------------------

//---------------------------------------------

//---------------------------------------------


//---------------------------------------------

//---------------------------------------------




//---------------------------------------------
// 46. 二叉搜索树的后序遍历序列
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。

// 如果是则返回true，否则返回false。

// 假设输入的数组的任意两个数字都互不相同。

// 样例
// 输入：[4, 8, 6, 12, 16, 14, 10]

// 输出：true
// class Solution {
// public:
//     bool verifySequenceOfBST(vector<int> sequence) {
//         if(!sequence.size()) return true;
//         return dfs(sequence, 0, sequence.size() - 1);
//     }
//     bool dfs(vector<int>& sequence, int left, int right ){
//         if(left >= right) return true;
//         int root = sequence[right];
//         int index = right;
//         for(int i = left; i < right; i++){
//             if(sequence[i] >= root){
//                 index = i;
//                 break;
//             }
//         }
//         for(int i = index; i < right; i++){
//             if(sequence[i] <= root){
//                 return false;
//             }
//         }
//         return dfs(sequence, left, index - 1) && dfs(sequence, index, right - 1);
//     }
// };
//---------------------------------------------
// 47. 二叉树中和为某一值的路径
//    题目
//    提交记录
//    讨论
//    题解
//    视频讲解

// 输入一棵二叉树和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。

// 从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

// 样例
// 给出二叉树如下所示，并给出num=22。
//       5
//      / \
//     4   6
//    /   / \
//   12  13  6
//  /  \    / \
// 9    1  5   1

// 输出：[[5,4,12,1],[5,6,6,5]]

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

// class Solution {
// public:
//     vector<vector<int>> findPath(TreeNode* root, int sum) {
//         vector<vector<int>> result;
//         vector<int> list;
//         dfs(result, list, root, sum);
//         return result;
//     }
//     void dfs(vector<vector<int>>& result, vector<int>& list,TreeNode* root, int sum){
//         if(!root) return;
//         list.push_back(root->val);
//         sum -= root->val;
//         if(sum == 0 && !root->left && !root->right){
//             result.push_back(list);
//         }
//         dfs(result, list, root->left, sum);
//         dfs(result, list, root->right, sum);
//         list.pop_back();//需要把塞入的节点去除
//     }
// };
//---------------------------------------------
// 67. 数字在排序数组中出现的次数
// 统计一个数字在排序数组中出现的次数。

// 例如输入排序数组[1, 2, 3, 3, 3, 3, 4, 5]和数字3，由于3在这个数组中出现了4次，因此输出4。

// 样例
// 输入：[1, 2, 3, 3, 3, 3, 4, 5] ,  3

// 输出：4

// 22:45
// class Solution {
// public:
//     int getNumberOfK(vector<int>& nums , int k) {
//         if(!nums.size()) return 0;
//         int leftIndex = getNumIndex(nums, k, 0, nums.size() -1, true);
//         int rightIndex = getNumIndex(nums, k, 0, nums.size() -1, false);
//         if(leftIndex == -1 || rightIndex == -1) return 0;
//         return rightIndex - leftIndex + 1;
//     }
//     int getNumIndex(vector<int>& nums, int k, int left, int right, bool isLeft){
//         int index = -1;
//         while(left < right){
//             int mid = (left + right) >> 1;
//             if(nums[mid] == k){
//                 if(isLeft){
//                     if(mid - 1 < 0 || nums[mid - 1] < k) return mid;
//                     if(nums[mid - 1] == k) right = mid - 1;
//                 } else {
//                     if(mid + 1 > nums.size() - 1 || nums[mid + 1] > k) return mid;
//                     if(nums[mid + 1] == k) left = mid + 1;
//                 }
//             } else if(nums[mid] < k){
//                 left = mid + 1;
//             } else {
//                 right = mid - 1;
//             }
//         }
//         if(nums[left] == k) index = left;
//         return index;
//     }
// };


//---------------------------------------------
// 71. 二叉树的深度
// 输入一棵二叉树的根结点，求该树的深度。

// 从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。

// 样例
// 输入：二叉树[8, 12, 2, null, null, 6, 4, null, null, null, null]如下图所示：
//     8
//    / \
//   12  2
//      / \
//     6   4

// 输出：3

// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

// class Solution {
// public:
//     int treeDepth(TreeNode* root) {
//         int maxDeep = 0;
//         if (!root) return maxDeep;
//         FindTreeMaxDeep(root, 1, maxDeep);
//         return maxDeep;
//     }
//     void FindTreeMaxDeep(TreeNode* root, int currentDeep,int& maxDeep){
//         if(currentDeep > maxDeep) maxDeep = currentDeep;
//         if(root->left){
//             FindTreeMaxDeep(root->left, currentDeep + 1, maxDeep);
//         }
//         if(root->right){
//             FindTreeMaxDeep(root->right, currentDeep + 1, maxDeep);
//         }
//     }
// };


//---------------------------------------------
// 73. 数组中只出现一次的两个数字
// 一个整型数组里除了两个数字之外，其他的数字都出现了两次。

// 请写程序找出这两个只出现一次的数字。

// 你可以假设这两个数字一定存在。

// 样例
// 输入：[1,2,3,3,4,4]

// 输出：[1,2]
// class Solution {
// public:
//     vector<int> findNumsAppearOnce(vector<int>& nums) {
//         vector<int> result;
//         if(nums.size() == 0) return result;
//         int key = nums[0];
//         for(int i = 1; i < nums.size(); i++){
//             key ^= nums[i];
//         }
//         int lastKey = key;
//         while(key != 0){
//             lastKey = key;
//             key = key & (key -1);
//         }

//         int result1 = 0 , result2 = 0;
//         for(auto value : nums){
//             if(lastKey & value) {
//                 result1 ^= value;
//             } else {
//                 result2 ^= value;
//             }
//         }
//         result.push_back(result1);
//         result.push_back(result2);
//         return result;
//     }
// };

//---------------------------------------------
// 74. 数组中唯一只出现一次的数字
// 在一个数组中除了一个数字只出现一次之外，其他数字都出现了三次。

// 请找出那个只出现一次的数字。

// 你可以假设满足条件的数字一定存在。

// 思考题：

// 如果要求只使用 O(n) 的时间和额外 O(1) 的空间，该怎么做呢？
// 样例
// 输入：[1,1,1,2,2,2,3,4,4,4]

// 输出：3

//思路: 统计每一位上的1的数量，单独的那个数字必然会 某一位1的数量除三余1

// class Solution {
// public:
//     int findNumberAppearingOnce(vector<int>& nums) {
//         int result = 0;
//         for(int i = 0; i < 32; i++){
//             int key = 1 << i;
//             int count = 0;
//             for(auto value: nums){
//                 if(key & value) {
//                     count++;
//                 }
//             }
//             if(count %3 == 1){
//                 result = result | key;
//             }
//         }
//         return result;
//     }
// };
//---------------------------------------------
// 75. 和为S的两个数字
// 输入一个数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。

// 如果有多对数字的和等于s，输出任意一对即可。

// 你可以认为每组输入中都至少含有一组满足条件的输出。

// 样例
// 输入：[1,2,3,4] , sum=7

// 输出：[3,4]


// class Solution {
// public:
//     vector<int> findNumbersWithSum(vector<int>& nums, int target) {
//         vector<int> result;
//         if(nums.size() == 0) return result;
//         int leftIndex = 0, rightIndex = nums.size() - 1;
//         sort(nums.begin(), nums.end());
//         while(leftIndex < rightIndex){
//             if(nums[leftIndex] + nums[rightIndex] == target){
//                 result.push_back(nums[leftIndex]);
//                 result.push_back(nums[rightIndex]);
//                 return result;
//             } else if(nums[leftIndex] + nums[rightIndex] < target){
//                 leftIndex++;
//             } else {
//                 rightIndex--;
//             }
//         }
//         return result;
//     }
// };

// // unordered_set是一个内部为hash表的集合;c++11新特性

// class Solution {
// public:
//     vector<int> findNumbersWithSum(vector<int>& nums, int target) {
//         unordered_set<int> tempSet;
//         for(auto value : nums){
//             if(tempSet.count(target - value)) return vector<int> {value, target - value};
//             tempSet.insert(value);
//         }
//     }
// };

//---------------------------------------------
// 76. 和为S的连续正数序列
// 输入一个正数s，打印出所有和为s的连续正数序列（至少含有两个数）。

// 例如输入15，由于1+2+3+4+5=4+5+6=7+8=15，所以结果打印出3个连续序列1～5、4～6和7～8。

// 样例
// 输入：15

// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]

// class Solution {
// public:
//     vector<vector<int> > findContinuousSequence(int sum) {
//         // 1 到 sum/2
//         vector<vector<int>> result;
//         int left = 1, right = 2; 
//         vector<int> temp = {1,2};
//         int currentSum = left + right;
//         while(left < right ){
//             if(currentSum == sum){
//                 result.push_back(temp);
//                 right++;
//                 temp.push_back(right);
//                 currentSum += right;
//             } else if(currentSum > sum){
//                 currentSum -= left;
//                 left ++;
//                 temp.erase(temp.begin());
//             } else {
//                 right ++;
//                 temp.push_back(right);
//                 currentSum += right;
//             }
//         }
//         return result;
//     }
// };
//---------------------------------------------
// 80. 骰子的点数
// 将一个骰子投掷n次，获得的总点数为s，s的可能范围为n~6n。
// 掷出某一点数，可能有多种掷法，例如投掷2次，掷出3点，共有[1,2],[2,1]两种掷法。
// 请求出投掷n次，掷出n~6n点分别有多少种掷法。

// 样例1
// 输入：n=1
// 输出：[1, 1, 1, 1, 1, 1]
// 解释：投掷1次，可能出现的点数为1-6，共计6种。每种点数都只有1种掷法。所以输出[1, 1, 1, 1, 1, 1]。

// 样例2
// 输入：n=2
// 输出：[1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
// 解释：投掷2次，可能出现的点数为2-12，共计11种。每种点数可能掷法数目分别为1,2,3,4,5,6,5,4,3,2,1。
//       所以输出[1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]。


// 遍历效率很低
// class Solution {
// public:
//     vector<int> numberOfDice(int n) {
//         vector<int> result;
//         for(int i = n; i <= 6*n; i++){
//             result.push_back(dfs(n, i));
//         }
//         return result;
//     }
//     // count 是 投掷的剩余次数，sum是投掷的剩余点数总和
//     int dfs(int count, int sum){
//         if(sum < 0) return 0; //点数减没了说明方案不符合
//         // if(count == 0 && sum == 0) return 1;
//         if(!count) {
//             return !sum; //次数投完之后，sum为0说明方案符合
//         } else {
//             int res = 0;
//             for(int i = 1; i <= 6; i++){
//                 res += dfs(count - 1, sum - i);
//             }
//             return res;
//         }
//     }
// };

// 动态规划法
// class Solution {
// public:
//     // dp[i][j] 投掷前i次，总和是j的总方案数量
//     vector<int> numberOfDice(int n) {
//         vector<vector<int>> dp(n+1, vector<int>(6 * n + 1));
//         dp[0][0] = 1;
//         for(int i = 1; i <= n; i++){
//             for(int j = 1; j <= 6*i; j++){
//                 for(int k = 1; k <= 6; k++){
//                     if(j-k < 0) continue;
//                     dp[i][j] += dp[i-1][j-k];
//                 }
//             }
//         }
//         vector<int> result;
//         for(int i = n; i <= 6*n; i++){
//             result.push_back(dp[n][i]);
//         }
//         return result;
//     }
// };

//---------------------------------------------


题目描述
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

class Solution {
public:
    bool Find(int target, vector<vector<int> > array) {
        if(array.size() <= 0){
        	return false;
        }
        int nRow = 0;
        int nColumn = array[0].size() - 1;

        while(nRow < array.size() && nColumn < array[0].size()){
        	int current = array[nRow][nColumn];
        	if(current == target){
        		return true;
        	} else if(current < target){
        		nRow++;
        	} else {
        		nColumn--;
        	}
        }

        return false;
    }
};



题目描述
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

class Solution {
public:
	void replaceSpace(char *str,int length) {
		if(str == NULL) return;
		int blockCount = 0;

		int strLen = 0;
		while(strLen <= length && str[strLen] != NULL){
			if(str[strLen] == ' '){
				blockCount++;
			}
			strLen++;
		}
		if(blockCount ==0)return;

		int endPos2 = blockCount * 2 + strLen;
		int endPos1 = strLen;

		while(endPos1 >= 0){
			if(str[endPos1] == ' '){
				str[endPos2--] = '0';
				str[endPos2--] = '2';
				str[endPos2--] = '%';
			} else {
				str[endPos2--] = str[endPos1];
			}
			endPos1--;
		}
	}
};


题目描述
输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

/**
*  struct ListNode {
*        int val;
*        struct ListNode *next;
*        ListNode(int x) :
*              val(x), next(NULL) {
*        }
*  };
*/
class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        stack<int> stk;
        ListNode* temp = head;
        while(temp != NULL){
        	stk.push(temp->val);
        	temp = temp->next;
        }
        vector<int> v;
        while(!stk.empty()){
        	v.push_back(stk.top());
        	stk.pop();
        }
        return v;

    }
};



题目描述
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin) {
    	TreeNode * TreeHead = NULL;
    	if(pre.size() <= 0 || vin.size() <= 0){
    		return TreeHead;
    	}

    }

};


取前序的第一个，然后再中序中找到位置，进行切割，分两部分，
中序的第二部分的第一个为目标，在前序中找到，分两部分，
递归









题目描述
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

入栈
class Solution
{
public:
    void push(int node) {
        stack1.push(node);
    }

    int pop() {
    	int result = -1;
        if(stack1.empty() && stack2.empty()){
        	return result;
        }
        if(!stack2.empty()){
        	result = stack2.top();
        	stack2.pop();
        	return result;
        }else{
        	while(!stack1.empty()){
        		stack2.push(stack1.top());
        		stack1.pop();
        	}
	        if(!stack2.empty()){
	        	result = stack2.top();
	        	stack2.pop();
	        	
	        }
	        return result;
        }

    }

private:
    stack<int> stack1;
    stack<int> stack2;
};



题目描述
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 
例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。


头尾两个指针，左边的比右边的大，左指针就向中间移动
如果两个值一样，由后者往前找，找到不一样的值

class Solution {
public:
    int minNumberInRotateArray(vector<int> rotateArray) {

};



题目描述
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
n<=39

class Solution {
public:
    int Fibonacci(int n) {
    	if(n == 0 || n == 1){
    		return n;
    	}
    	int leftCount = Fibonacci(0);
    	int rightCount = Fibonacci(1);
    	int currentCount = leftCount + rightCount;
    	for (int i = 2; i < n; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};



题目描述
一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

class Solution {
public:
    int jumpFloor(int number) {
    	if(number <= 0){
    		return 0;
    	}
    	if(number == 1 || number == 2){
    		return number;
    	}
    	int leftCount = jumpFloor(1);
    	int rightCount = jumpFloor(2);
    	int currentCount = leftCount + rightCount;

    	for (int i = 3; i < number; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};


题目描述
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

class Solution {
public:
    int jumpFloorII(int number) {
    	//思路一
    	if(number == 0 || number == 1 || number == 2){
    		return number;
    	}
    	return 2*jumpFloorII(number - 1);

    	//思路二 等比数列求和
    	int result = 1;
    	for (int i = 0; i < number - 1; ++i)
    	{
    		result = result *2;
    	}
    	return result;
    }
};


题目描述
我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

class Solution {
public:
    int rectCover(int number) {
    	if(number == 0 || number == 1 || number == 2){
    		return number;
    	}

    	int leftCount = rectCover(1);
    	int rightCount = rectCover(2);
    	int currentCount = leftCount + rightCount;

    	for (int i = 3; i < number; ++i)
    	{
    		leftCount = rightCount;
    		rightCount = currentCount;
    		currentCount = leftCount + rightCount;
    	}
    	return currentCount;
    }
};


题目描述
输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

class Solution {
public:
     int  NumberOf1(int n) {
         //位与，去除最后一个1
     	int count = 0;
     	while(n != 0){
     		n = n & (n-1);
     		++count;
     	}
     	return count;
     }
};


题目描述
给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

class Solution {
public:
    double Power(double base, int exponent) {
    	if(base == 0){
    		return 0;
    	}
    	if(exponent == 0){
    		return 1;
    	}
    	bool isBaseFU = false;
    	if(base < 0){
    		isBaseFU = true;
    		base = -base;
    	}
    	if(exponent < 0){
    		exponent = -exponent;
    		base = 1/base;
    	}

    	double result = 1;
    	for(int i = 0; i < exponent; ++i){
    		result = result * base;
    	}

    	if(isBaseFU){
    		result = -result;
    	}
    	return result;
    }
};


题目描述
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，
所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

//保证顺序
class Solution {
public:
    void reOrderArray(vector<int> &array) {
        vector<int> v1;
        for (int i = 0; i < array.size(); ++i){
        	if(array[i] %2 == 1){
        		v1.push_back(array[i]);
        	}
        }
        for (int i = 0; i < array.size(); ++i){
        	if(array[i] %2 == 0){
        		v1.push_back(array[i]);
        	}
        }
        for (int i = 0; i < array.size(); ++i){
        	array[i] = v1[i];
        }
    }
};

//不保证顺序



题目描述
输入一个链表，输出该链表中倒数第k个结点。

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* FindKthToTail(ListNode* pListHead, unsigned int k) {
    	if(pListHead == NULL ||k == 0){
    		return NULL;
    	}

    	unsigned int currentCount = 0;
    	ListNode* temp = pListHead;
    	while(temp != NULL){
    		currentCount++;
    		temp = temp->next;
    		if(currentCount == k){
    			break;
    		}
    	}
    	if(currentCount <k){
    		return NULL;
    	}

    	ListNode* temp2 = pListHead;

    	while(temp != NULL){
    		temp = temp->next;
    		temp2 = temp2->next;
    	}
    	return temp2;
    }
};


题目描述
输入一个链表，反转链表后，输出新链表的表头。

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
    	if(pHead == NULL || pHead->next == NULL){
    		return pHead;
    	}
    	ListNode* newHead;

    	if(pHead->next->next == NULL){
    		newHead = pHead->next;
    		newHead->next = pHead;
    		pHead->next = NULL;
    		return newHead;
    	}

    	ListNode* pFirst = pHead;
    	ListNode* pMid = pFirst->next;
    	ListNode* pEnd = pMid->next;
    	pHead->next = NULL;

    	while(pEnd != NULL){
    		pMid->next = pFirst;
    		pFirst = pMid;
    		pMid = pEnd;
    		pEnd = pEnd->next;
    	}

    	pMid->next = pFirst;
    	return pMid;
    }
};


题目描述
输入两个单调递增的链表，输出两个链表合成后的链表，当然

/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
    {
        if(pHead1 == NULL){
        	return pHead2;
        }
        if(pHead2 == NULL){
        	return pHead1;
        }

        ListNode* pNewHead = NULL;
        ListNode* pTemp1 = pHead1;
        ListNode* pTemp2 = pHead2;

        if(pTemp1->val <= pTemp2->val){
    		pNewHead = pTemp1;
    		pTemp1 = pTemp1->next;
    	} else {
    		pNewHead = pTemp2;
    		pTemp2 = pTemp2->next;
    	}
        while(pTemp1 != NULL && pTemp2 != NULL){
        	if(pTemp1->val <= pTemp2->val){
        		pNewHead->next = pTemp1;
        		pTemp1 = pTemp1->next;
        	} else {
        		pNewHead->next = pTemp2;
        		pTemp2 = pTemp2->next;
        	}
        	pNewHead = pNewHead->next;
        }

        if(pTemp1 == NULL){
        	pNewHead->next = pTemp2;
        }
        if(pTemp2 == NULL){
        	pNewHead->next = pTemp1;
        }

        return (pHead1->val <= pHead2->val) ? pHead1 : pHead2;
    }
};


题目描述
输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    bool HasSubtree(TreeNode* pRoot1, TreeNode* pRoot2)
    {
    	if(pRoot1 == NULL || pRoot2 == NULL){
    		return false;
    	}
    	//根节点一样，判断左右一不一样
    	//根节点不一样，就A左右子树往下找
    	bool flag = false;
    	if(pRoot1->val == pRoot2->val){
    		flag = isTreeCopy(pRoot1, pRoot2);
    	}
    	if(flag == false){
    		flag = HasSubtree(pRoot1->left, pRoot2);
    	}
    	if(flag == false){
    		flag = HasSubtree(pRoot1->right, pRoot2);
    	}
    	return flag;
    }
    bool isTreeCopy(TreeNode* pRoot1, TreeNode* pRoot2){
    	if(pRoot1 == NULL){
    		return (pRoot2 == NULL) ? true : false;
    	} else {
    		if(pRoot2 == NULL){
    			return true;
    		} else {
    			if(pRoot1->val == pRoot2->val){
    				return isTreeCopy(pRoot1->left, pRoot2->left) && isTreeCopy(pRoot1->right, pRoot2->right);
    			} else {
    				return false;
    			}
    		}
    	}
    	return false;
    }
};


题目描述
操作给定的二叉树，将其变换为源二叉树的镜像。
输入描述:
二叉树的镜像定义：源二叉树 
    	    8
    	   /  \
    	  6   10
    	 / \  / \
    	5  7 9  11
    	镜像二叉树
    	    8
    	   /  \
    	  10   6
    	 / \  / \
    	11 9 7   5

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    void Mirror(TreeNode *pRoot) {
    	if(pRoot == NULL){
    		return;
    	}

    	TreeNode *pTemp = pRoot->left;
    	pRoot->left = pRoot->right;
    	pRoot->right = pTemp;

    	if(pRoot->left){
    		Mirror(pRoot->left);
    	}
    	if(pRoot->right){
    		Mirror(pRoot->right);
    	}
    }
};


题目描述
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，
例如，如果输入如下4 X 4矩阵： 
 1  2  3  4 
 5  6  7  8 
 9 10 11 12 
13 14 15 16 
则依次打印出数字  1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

class Solution {
public:
    vector<int> printMatrix(vector<vector<int> > matrix) {

    }
    
};



题目描述
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

class Solution {
public:
    void push(int value) {
        if(my_stack.empty()){
        	min_stack.push(value);
        } else {
        	if(min_stack.top() < value){
        		min_stack.push(min_stack.top());
        	} else {
        		min_stack.push(value);
        	}
        }
        my_stack.push(value);
    }
    void pop() {
        my_stack.pop();
        min_stack.pop();
    }
    int top() {

        return my_stack.top();
    }
    int min() {
        return min_stack.top();
    }
    stack<int> my_stack;
    stack<int> min_stack;
};

题目描述
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，
序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。
（注意：这两个序列的长度是相等的）

class Solution {
public:
    bool IsPopOrder(vector<int> pushV,vector<int> popV) {
        if(pushV.size() == 0 || popV.size() == 0) return false;

};



题目描述
从上往下打印出二叉树的每个节点，同层节点从左至右打印

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<int> PrintFromTopToBottom(TreeNode* root) {
    	vector<int> result;
    	queue<TreeNode*> queue_node;
    	if(root == NULL) return result;
    	queue_node.push(root);
    	while(!queue_node.empty()){
    		TreeNode* temp = queue_node.front();
    		queue_node.pop();
    		result.push_back(temp->val);
    		if(temp->left){
    			queue_node.push(temp->left);
    		}
    		if(temp->right){
				queue_node.push(temp->right);
    		}
    	}
    	return result;
    }
};


题目描述
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

class Solution {
public:
    bool VerifySquenceOfBST(vector<int> sequence) {
    	//左右根
    	//左比根小，根比右小
    	//最后一个是根节点，前边的是左右子树
    	//左子树的所有节点小于右子树的所有节点
    	
    	if(sequence.size() == 0){
    		return false;
    	}
    	return judgeBST(sequence, 0, sequence.size() - 1);

    }

    bool judgeBST(vector<int> array, int start, int end){
    	if(start >= end){
    		return true;
    	}

    	int rootValue = array[end];
    	int treeIndex = start;
    	while(array[treeIndex] < rootValue){
    		treeIndex++;
    	}
    	bool result = true;
    	for (int i = treeIndex; i < end; ++i)
    	{
    		if(array[i] <= rootValue){
    			result = false;
    			break;
    		}
    	}
    	if(result){
    		return judgeBST(array, start, treeIndex - 1) && judgeBST(array, treeIndex, end - 1);
    	}
    	return result;
    }
};




题目描述
输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
(注意: 在返回值的list中，数组长度大的数组靠前)

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<vector<int> > FindPath(TreeNode* root,int expectNumber) {
    	vector<vector<int>> result;
    	vector<int> path;
    	if(!root){
    		return result;
    	}
    	dfsTree(root, expectNumber, result, path);
    	return result;
    }
    void dfsTree(TreeNode* root, int expectNumber,vector<vector<int>>& result, vector<int> path){
    	path.push_back(root->val);
    	if(!root->left && !root->right){
    		if(expectNumber == root->val){
    			result.push_back(path);
    		}
    	}
    	if(root->left){
    		dfsTree(root->left, expectNumber - root->val, result, path);
    	}
    	if(root->right){
    		dfsTree(root->right, expectNumber - root->val, result, path);
    	}    	
    }
};


题目描述
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），
返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
示例1
输入

复制
输出

复制

/*
struct RandomListNode {
    int label;
    struct RandomListNode *next, *random;
    RandomListNode(int x) :
            label(x), next(NULL), random(NULL) {
    }
};
*/
class Solution {
public:
    RandomListNode* Clone(RandomListNode* pHead)
    {

    	//每个节点进行复制，然后挂在被复制的节点后边
    	//然后复制random指针
    	//拆分链表
        
    	RandomListNode* pHeadNew = NULL;
    	if(!pHead){
    		return pHeadNew;
    	}
    	copyTreeNode(pHead, pHeadNew);
    	return pHeadNew;
    }
    void copyTreeNode(RandomListNode* pHead, RandomListNode*& pHeadNew){
    	RandomListNode* temp = pHead;
    	while(temp){
    		RandomListNode* node = new RandomListNode(temp->label);
    		//node->label = temp->label;
    		node->next = temp->next;
    		node->random = temp->random;

    		temp->next = node;
    		temp = node->next;
    	}

    	temp = pHead;
    	pHeadNew = temp->next;
    	while(temp){
    		if(temp->random){
    			temp->next->random = temp->random->next;
    		}
    		temp = temp->next->next;
    	}
    	
    	temp = pHead;
    	RandomListNode* temp2 = pHead->next;
    	while(temp2->next){
    		temp->next = temp2->next;
    		
    		temp = temp->next;
    		temp2->next = temp->next;
    		temp2 = temp2->next;
    	}

    	temp->next = NULL;
    	temp2->next = NULL;
    };
};


题目描述
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不

/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    TreeNode* Convert(TreeNode* pRootOfTree)
    {
        //左根右
        TreeNode* pHead = NULL;

        if(!pRootOfTree){
        	return pHead;
        }
        vector<TreeNode*> treeQueue;
        searchTree(pRootOfTree, treeQueue);

        pHead = treeQueue[0];

        //重新排列
        for(int i = 0; i < treeQueue.size(); i++){
        	treeQueue[i]->left = (i == 0) ? NULL : treeQueue[i-1];
        	treeQueue[i]->right = (i == treeQueue.size()-1) ? NULL : treeQueue[i+1];
        }

        return pHead;

    }

    void searchTree(TreeNode* pRootOfTree,vector<TreeNode*> &treeQueue){

    	if(!pRootOfTree){
    		return;
    	}
    	if(pRootOfTree->left){
    		searchTree(pRootOfTree->left, treeQueue);
    	}
    	treeQueue.push_back(pRootOfTree);
    	if(pRootOfTree->right){
    		searchTree(pRootOfTree->right, treeQueue);
    	}
    }
};


题目描述
输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
输入描述:
输入一个字符串,长度不超过9(可能有字符重复),字符只包括大小写字母。

class Solution {
public:
    vector<string> Permutation(string str) {
        //将第一位和后边的每一位交换，然后输出，这样递归
       	//重复的字母跳过不排列
       	vector<string> result;
       	if(str.size() == 0) return result;
       	Per(result, str, 0);
       	//按字母顺序排序
       	sort(result.begin(), result.end());
       	return result;
    }

    void Per(vector<string> & result, string str, int index){
    	//当第一位和最后一位交换完毕后，递归结束
    	if(index == str.size()-1){
    		result.push_back(str);
    		return;
    	}
    	for(int i = index; i<str.size(); ++i){
    		//依次交换
	    	if(i!=index && str[index] == str[i]){
	    		continue;
	    	}
	    	//交换
	    	swapString(str, index, i);
	    	Per(result, str, index+1);
	    	//交换回去
	    	swapString(str, index, i);
    	}
   	}

   	void swapString(string & str, int index1, int index2){
   		char temp = str[index1];
   		str[index1] = str[index2];
   		str[index2] = temp;
   	}
};



题目描述
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

class Solution {
public:
    int MoreThanHalfNum_Solution(vector<int> numbers) {
    	int result = 0;
    	int count = 0;
    	if(numbers.size() == 0) return result;
    	result = numbers[0];
    	for(int i = 0; i < numbers.size(); i++){
    		if(numbers[i] == result){
    			count++;
    		} else {
    			count--;
    		}
    		if(count < 0){
    			result = numbers[i];
    			count = 0;
    		}
    	}
    	return (count > 0) ? result : 0;
    }
};


题目描述
输入n个整数，找出其中最小的K个数。
例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

class Solution {
public:
    vector<int> GetLeastNumbers_Solution(vector<int> input, int k) {
    	vector<int> result;
    	if(k > input.size()) return result;

    	//前k个塞进去
    	for(int i = 0; i < k; ++i){
    		result.push_back(input[i]);
    	}

    	int currentMaxIndex = getMax(result);
    	for(int j = k; j < input.size(); j++){
    		if(input[j] < result[currentMaxIndex]){
    			result[currentMaxIndex] = input[j];
    			currentMaxIndex = getMax(result);
    		}
    	}
    	return result;

    }

    int getMax(vector<int> & result){
    	int maxIndex = 0;
    	for(int i = 0; i < result.size(); ++i){
    		if(result[maxIndex] > result[i]){
    			maxIndex = i;
    		}
    	}
    	return maxIndex;
    }
};

题目描述
HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。
今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,当向量全为正数的时候,问题很好解决。
但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？
例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)

class Solution {
public:
    int FindGreatestSumOfSubArray(vector<int> array) {
    	if(array.size() <= 1){
    		return 0;
    	}
    	//动态规划，连续的一段数组的和累加出负数的话，说明这一段没意义，直接从新的地方开始
    	int totalMax = array[0];
    	int currentMax = 0;
    	// int startIndex = 0;
    	for(int i = 0; i<array.size(); i++){
    		currentMax += array[i];
    		if(currentMax < 0){
    			currentMax = 0;
    		} else if(currentMax > totalMax){
    			totalMax = currentMax;
    		}

    	}
    	//如果全是负数，取最小的一个
    	if(totalMax < 0){
    		totalMax = array[0];
    		for(int i = 0; i < array.size(); i++){
    			if(totalMax < array[i]){
    				totalMax = array[i];
    			}
    		}
    	}
    	return totalMax;
    }
};

题目描述(整数中1出现的次数（从1到n整数中1出现的次数）)
求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？
为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。
ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。

class Solution {
public:
    int NumberOf1Between1AndN_Solution(int n)
    {
    
    }
};


题目描述(把数组排成最小的数)
输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

class Solution {
public:
    string PrintMinNumber(vector<int> numbers) {
        string resultStr = "";
        if(numbers.size() == 0) return resultStr;
        vector<string> strArray;
        for(int i = numbers; i < numbers.size(); ++i){
        	string temp = to_string(numbers[i]);
        	strArray.push_back(temp);
        }
        sort(strArray.begin(), strArray.end());
        for (int i = 0; i < strArray.size(); ++i)
        {
        	resultStr = resultStr + strArray[i];
        }
        return resultStr;
    }
};

//---------------------------------------------

//---------------------------------------------


int main(){

    cout << "fuck" << endl;
    
}

