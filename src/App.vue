<template>
  <div class="min-h-screen bg-pink-100 flex flex-col">
    <header class="bg-white border-b border-black p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Course Planner</h1>
      <a href="https://github.com/salmanulfaris/course-planner" target="_blank" rel="noopener noreferrer"
        class="text-gray-600 hover:text-gray-900">
        <GithubIcon class="h-6 w-6" />
      </a>
    </header>
    <div class="flex-grow flex flex-col md:flex-row">
      <!-- Sidebar with available courses -->
      <div
        class="w-full md:w-1/4 bg-orange-100  border-r border-black p-6 overflow-y-auto max-h-screen lg:sticky top-0">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Available Courses</h2>
        <div class="mb-4">
          <input v-model="searchQuery" type="text" placeholder="Search courses..."
            class="w-full p-2 border border-black rounded-md" />
        </div>
        <div class="space-y-2">
          <div v-for="course in filteredCourses" :key="course.course_id" draggable="true"
            @dragstart="dragStart($event, course)" class="bg-white p-3 border border-slate-900 rounded-lg ">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-700">{{ course.name }}</h3>
                <p class="text-sm text-gray-600">Code: {{ course.course_id }}</p>
                <p class="text-sm text-gray-600">Credits: {{ course.credit }}</p>
                <p class="text-sm text-gray-600">Level: {{ course.level }}</p>
                <div v-if="course.prerequisites.length" class="text-xs text-gray-500 mt-1">
                  Pre-req: {{ course.prerequisites.join(', ') }}
                </div>
                <div v-if="course.corequisites.length" class="text-xs text-gray-500 mt-1">
                  Co-req: {{ course.corequisites.join(', ') }}
                </div>
              </div>
              <button @click="addCourseToLastTerm(course)"
                class="bg-red-400 border border-black text-white rounded-full w-6 h-6 flex shrink-0 items-center justify-center shadow-sm hover:rotate-90 transition-all hover:bg-blue-500 ease-in-out duration-200">
                <PlusIcon class="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content area with timeline -->
      <div class="flex-1 p-6 overflow-y-auto lg:max-h-screen">
        <div class="bg-lime-100 border border-slate-900 rounded-lg  p-4 mb-6">
          <h2 class="text-xl font-bold mb-2 text-gray-800">Plan Summary</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-sm text-gray-600">Total Credits:</p>
              <p class="text-lg font-semibold">{{ totalCredits }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Highest Level:</p>
              <p class="text-lg font-semibold">{{ highestLevel }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Terms:</p>
              <p class="text-lg font-semibold">{{ terms.length }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Months:</p>
              <p class="text-lg font-semibold">{{ totalMonths }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="absolute top-0 bottom-0 left-8 border-l-2 border-dotted border-gray-300 -z-8"></div> -->
        <div class="flex border items-baseline flex-wrap  lg:relative gap-2  ">
          <!-- Dotted line connecting terms -->

          <div v-for="(term, index) in terms" :key="index" class="bg-white rounded-lg p-4 lg:w-1/3 md:w-1/3">
            <div class="flex justify-between items-center mb-3">
              <h2 class="text-xl font-semibold text-gray-700">Term {{ index + 1 }}</h2>
              <button @click="removeTerm(index)" class="text-red-500 hover:text-red-700" :disabled="terms.length === 1">
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
            <div class="min-h-[200px] bg-gray-50 rounded p-2 space-y-2" @dragover.prevent
              @drop="dropCourse($event, index)">

              <div v-for="course in term.courses" :key="course.course_id"
                :class="{ 'bg-green-100': course.course_type === 'theory', 'bg-blue-100': course.course_type === 'project' }"
                class=" p-2 rounded border border-dashed border-black ">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-semibold text-gray-700">{{ course.name }}</h3>
                    <p class="text-sm text-gray-600">Code: {{ course.course_id }}</p>
                    <p class="text-sm text-gray-600">Credits: {{ course.credit }}</p>
                  </div>
                  <button @click="removeCourse(index, course)" class="text-red-500 hover:text-red-700">
                    <XIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div v-if="term.courses.length == 0" class="text-center text-gray-400 mt-10">
                Drag Courses from left side
              </div>



            </div>
            <p class="mt-3 text-sm font-semibold text-gray-600">
              Total Credits: {{ termCredits(term) }}
            </p>
          </div>

          <!-- Add new term button -->
          <button v-if="canAddNewTerm" @click="addTerm"
            class="bg-blue-400 border border-black text-white rounded-full w-12 h-12 flex items-center justify-center  hover:bg-blue-600 transition-colors duration-200 ml-8">
            <PlusIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Toast for errors -->
    <Transition name="fade">
      <div v-if="showToast" class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XIcon, PlusIcon, TrashIcon, GithubIcon } from 'lucide-vue-next'
import iitCourses from './data/courses';

// Updated course data with level_id
const courses = iitCourses

const terms = ref([{ courses: [] }])
const availableCourses = ref([...courses])
const searchQuery = ref('')

const showToast = ref(false)
const toastMessage = ref('')

const filteredCourses = computed(() => {
  return availableCourses.value.filter(course =>
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.course_id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalCredits = computed(() => {
  return terms.value.reduce((total, term) => {
    return total + term.courses.reduce((termTotal, course) => termTotal + course.credit, 0)
  }, 0)
})

const highestLevel = computed(() => {
  const levels = terms.value.flatMap(term => term.courses.map(course => course.level))
  return levels.length ? levels.reduce((a, b) => a > b ? a : b) : 'N/A'
})

const totalMonths = computed(() => {
  return terms.value.length * 4
})

const canAddNewTerm = computed(() => {
  return terms.value.every(term => term.courses.length > 0)
})

function termCredits(term) {
  return term.courses.reduce((total, course) => total + course.credit, 0)
}

function addTerm() {
  if (canAddNewTerm.value) {
    terms.value.push({ courses: [] })
  }
}

function removeTerm(index) {
  if (terms.value.length > 1) {
    const removedCourses = terms.value[index].courses
    availableCourses.value.push(...removedCourses)
    terms.value.splice(index, 1)
  }
}

function dragStart(event, course) {
  event.dataTransfer.setData('text/plain', JSON.stringify(course))
}

function dropCourse(event, termIndex) {
  const courseData = JSON.parse(event.dataTransfer.getData('text/plain'))
  addCourseToTerm(courseData, termIndex)
}

function addCourseToLastTerm(course) {
  const lastTermIndex = terms.value.length - 1
  addCourseToTerm(course, lastTermIndex)
}

function addCourseToTerm(course, termIndex) {
  const term = terms.value[termIndex]
  // Filter theory only
  let thoery = term.courses.filter(c => c.course_type === 'theory')
  // Filter project course
  let project = term.courses.filter(c => c.course_type === 'project')

  if (course.course_type === 'theory' && thoery.length >= 4) {
    showError('A term can have at most 4 theory courses.')
    return
  }
  if (course.course_type === 'project' && project.length >= 2) {
    showError('A term can have at most 2 project courses.')
    return
  }



  if (!validateCorequisites(course, termIndex)) {
    showError('Corequisites not met for this course.')
    return
  }

  if (!validateLevel(course, termIndex)) {
    showError('Course level not allowed. Complete all lower level courses first.')
    return
  }

  term.courses.push(course)
  availableCourses.value = availableCourses.value.filter(c => c.course_id !== course.course_id)

  thoery = term.courses.filter(c => c.course_type === 'theory')


  if (thoery.length == 4) {
    addTerm()
  }


}

function validatePrerequisites(course, termIndex) {
  const previousCourses = terms.value.slice(0, termIndex).flatMap(term => term.courses)
  return course.prerequisites.every(prereq =>
    previousCourses.some(c => c.course_id === prereq)
  )
}

function validateCorequisites(course, termIndex) {
  const currentAndPreviousCourses = terms.value.slice(0, termIndex + 1).flatMap(term => term.courses)
  return course.corequisites.every(coreq =>
    currentAndPreviousCourses.some(c => c.course_id === coreq)
  )
}

function validateLevel(course, termIndex) {
  const term = terms.value[termIndex]

  const allCourses = availableCourses.value

  const restCourses = new Set(allCourses.map(c => c.level_id))


  for (let i = 1; i < course.level_id; i++) {
    if (restCourses.has(i)) {
      return false
    }
  }
  if (term.courses.length === 0) {
    return true
  } else {
    return term.courses[0].level_id === course.level_id
  }



}

function removeCourse(termIndex, course) {
  const term = terms.value[termIndex]
  term.courses = term.courses.filter(c => c.course_id !== course.course_id)
  availableCourses.value.push(course)

  // Remove courses that have the deleted course as a corequisite
  terms.value.forEach(t => {
    t.courses = t.courses.filter(c => !c.corequisites.includes(course.course_id))
  })
}

function showError(message) {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
