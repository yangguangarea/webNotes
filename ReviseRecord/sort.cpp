
// https://blog.csdn.net/weixin_41190227/article/details/86600821

// 算法可视化网址 
// https://algorithm-visualizer.org/divide-and-conquer/bucket-sort

/*
排序算法 平均时问复杂度     最好情況      最坏情况  空间复杂度  排序方式    稳定性
冒泡排序     O(n2)        O(n)         O(n2)     O(1)    In-place    稳定
选择排序     O(n2)        O(n2)        O(n2)     O(1)    In-place   不稳定
插入排序     O(n2)        O(n)         O(n2)     O(1)    In-place    稳定
希尔排序     O(nlogn)     O(nlogn)     O(nlogn)  O(1)    In-place   不稳定
归并排序     O(nlogn)     O(nlogn)     O(nlogn)  O(1)    Out-place   稳定
快速排序     O(nlogn)     O(nlogn)     O(n2)     O(logn) In-place   不稳定
堆排序       O(nlogn)     O(nlogn)     O(nlogn)  O(1)    In-place   不稳定
计數排序     O(n+k)       O(n+k)       O(n+k)    O(k)    Out-place    稳定
桶排序       O(n+k)       O(n+k)       O(n2)     O(n+k)  Out-place   稳定
基数排序     O(n*k)       O(n*k)       O(n*k)    O(n+k)  Out-place    稳定

n: 数据规模
k: "桶"的个数
In-place: 占用常数内存，不占用额外内存
Out-place: 占用额外内存
*/

#include <iostream>
#include <vector>
#include <map>
#include <stack>
#include <list>
#include <set>
#include <cmath>


using namespace std;

class SortSet {
public:
    //----------------------
    void testFunction(){
        int aaa[] = {2,5,7,1,9,4,2,8,6,4};
        // int aaa[] = {5,4,3,2,1};
        // int aaa[] = {1,2,3,4,5};
        // int aaa[] = {5,2,1,3,4};

        vector<int> array;
        cout << "---排序前---"  << endl;
        for(auto i : aaa){
            array.push_back(i);
            cout << i << " ";
        }
        cout << endl;
        // bubbleSort(array);
        // selectionSort(array);
        // insertionSort(array);
        // shellSort(array);
        // mergeSort(array);
        // quickSort(array);
        // heapSort(array);
        // countingSort(array);

        cout << "---排序后---"  << endl;
        for(auto i : array){
            cout << i << " ";
        }
        
        cout << endl;
    }

    //----------------------
    //相邻交换，最大的交换到最后
    //标记如果没有交换的时候就认为剩余部分已经排序完成
    void bubbleSort(vector<int>& array){
        for(int i = 0; i < array.size(); ++i){
            bool swapFlag = false;
            for(int j = 0; j < array.size() - i - 1; ++j){
                if(array[j] > array[j + 1]) swap(array[j], array[j + 1]), swapFlag = true;
            }
            if(!swapFlag) break;
        }
    }
    
    //----------------------
    //每趟选个最小的放最前边
    void selectionSort(vector<int>& array){
        for(int i = 0; i < array.size(); i++){
            int minIndex = i;
            for(int j = i; j < array.size(); j++){
                if(array[minIndex] > array[j]){
                    minIndex = j;
                }
            }
            if(minIndex != i) swap(array[minIndex], array[i]);
        }
    }

    //----------------------
    //认为前边的是排好序的，然后拿一个往前插入到对应的位置中
    //注意边界问题
    void insertionSort(vector<int>& array){
        for(int i = 0; i < array.size(); i++){
            int mark = array[i];
            int j = i - 1;
            for(; j >= 0; j--){
                if(array[j] > mark){
                    array[j + 1] = array[j];
                } else break;
            }
            array[j + 1] = mark;
        }
    }

    //----------------------
    //希尔排序 按一定间距，将固定间距的位置划分在一组中，总共有多组
    //然后组内进行插入排序，排序之后，缩小间隔，按新组排序，直到间隔为1为止
    void shellSort(vector<int>& array){
        //间隔等于1就相当于是插入排序
        int gap = array.size() / 2;
        while(gap > 0){
            for(int i = gap; i < array.size(); i++){
                int mark = array[i];
                int k = i - gap;
                while(k >= 0 && array[k] > mark){
                    array[k + gap] = array[k];
                    k -= gap;
                }
                array[k + gap] = mark;
            }
            gap /= 2;
        }
    }

    //----------------------
    //归并排序 借用辅助数组，然后认为左右两边的部分已经排好序，把两部分合并到辅助数组中
    //归并排序可以求数组里的逆序对个数， 左部分逆序对+右部分逆序对+自身左右之间的逆序对
    void mergeSort(vector<int>& array){
        if(!array.size()) return;
        // mergePart(array, 0, array.size() - 1);
        cout << getInverseOrderCount(array, 0, array.size() - 1) << endl;
    }
    
    int getInverseOrderCount(vector<int>& array, int left, int right){
        if(left >= right) return 0;
        int mid = (left + right) / 2;
        int inverseCount = 0;
        inverseCount += getInverseOrderCount(array, left, mid);
        inverseCount += getInverseOrderCount(array, mid + 1, right);
        vector<int> tempArray;
        int leftIndex = left, rightIndex = mid + 1;
        while(leftIndex <= mid && rightIndex <= right){
            if(array[leftIndex] <= array[rightIndex]){
                tempArray.push_back(array[leftIndex++]);
            } else {
                //这里说明右边的值小于左边的，是逆序对
                //左边没有放的值大于右边当前的这个值
                inverseCount += (mid - leftIndex + 1);
                tempArray.push_back(array[rightIndex++]);
            }
        }
        while(leftIndex <= mid){
            tempArray.push_back(array[leftIndex++]);
        }
        while(rightIndex <= right){
            tempArray.push_back(array[rightIndex++]);
        }
        for(int i = 0; i < tempArray.size(); i++){
            array[left + i] = tempArray[i];
        }
        return inverseCount;
    }

    void mergePart(vector<int>& array, int left, int right){
        if(left >= right) return;
        int mid = (left + right) / 2;
        mergePart(array, left, mid);
        mergePart(array, mid + 1, right);
        vector<int> tempArray;
        int leftIndex = left, rightIndex = mid + 1;
        while(leftIndex <= mid && rightIndex <= right){
            if(array[leftIndex] <= array[rightIndex]){
                tempArray.push_back(array[leftIndex++]);
            } else {
                tempArray.push_back(array[rightIndex++]);
            }
        }
        while(leftIndex <= mid){
            tempArray.push_back(array[leftIndex++]);
        }
        while(rightIndex <= right){
            tempArray.push_back(array[rightIndex++]);
        }
        for(int i = 0; i < tempArray.size(); i++){
            array[left + i] = tempArray[i];
        }
    }

    //----------------------
    
    //快速排序 取一个位置，把它放入对应的下标，左边的都比它小，右边的都比它大，递归
    //快排三种实现方式 https://blog.csdn.net/qq_36528114/article/details/78667034
    //链表快排时，左右指针的办法不能追溯前边的节点，所以要用区间指针做
    //区间指针就是，两个指针，从头往后扫，左指针停留在大于key的区间左边，右指针在区间的右边，然后交换
    
    void quickSort(vector<int>& array){
        if(!array.size()) return ;
        quickPart(array, 0, array.size() - 1);
    }   
    void quickPart(vector<int>& array, int left, int right){
        int i = left, j = right;
        int mark = array[i];
        if(i >= j) return ;
        while(i < j){
            while(i < j && array[j] >= mark) j--;
            if(i < j) array[i] = array[j];
            while(i < j && array[i] <= mark) i++;
            if(i < j) array[j] = array[i];
        }
        array[i] = mark;
        quickPart(array, left, i - 1);
        quickPart(array, i + 1, right);
    }


    //----------------------
    //堆排序 1.建堆，从尾往前建立  2.头尾元素交换，重新调整堆
    void heapSort(vector<int>& array){
        for(int i = array.size() / 2 - 1; i >= 0; i--){
            adjustHeap(array, i, array.size());
        }
        for(int i = array.size() - 1; i >= 0; i--){
            swap(array[0], array[i]);
            adjustHeap(array, 0, i);
        }
    }
    //这里加了个border边界，超过边界的数组部分不进行排序操作
    //某一个节点为根节点，然后依次将交换了的位置一直往堆的深处调整
    void adjustHeap(vector<int>& array, int index, int border){
        //保证当前的父节点是最大的值
        int maxIndex = index;
        int leftChild = index * 2 + 1, rightChild = index * 2 + 2;
        //这时候index相当于是父节点
        if((leftChild) < border && array[leftChild] > array[maxIndex]){
            maxIndex = leftChild;
        }
        if((rightChild) < border && array[rightChild] > array[maxIndex]){
            maxIndex = rightChild;
        }
        if(maxIndex != index && maxIndex < border){
            swap(array[maxIndex], array[index]);
            adjustHeap(array, maxIndex, border); 
        }
    }

    //----------------------
    //计数排序 适合数值有限范围，有大量的数
    void countingSort(vector<int>& array){
        if(!array.size()) return;
        int min = array[0], max = array[0];
        for(auto i : array){
            if(min > i) min = i;
            if(max < i) max = i;
        }
        vector<int> tempArray(max - min + 1, 0);
        for(auto i : array){
            tempArray[i - min]++;
        }
        int index = 0;
        for(int i = 0; i < tempArray.size(); i++){
            if(tempArray[i]){
                for(int k = tempArray[i]; k > 0; k--){
                    array[index] = i + min, index++;
                }
            }
        }
    }
    //桶排序 按一定范围，把大的数据分割在多个桶内，桶内排序后再输出
    //基数排序 按数字的从低位进行 类似桶排序 然后再高位



    void printArray(vector<int>& array){
        cout << "---打印数组---"  << endl;
        for(auto i : array){
            cout << i << " ";
        }
        cout << endl;
    }


};




int main(){

    SortSet sort;
    sort.testFunction();



    return 0;
}