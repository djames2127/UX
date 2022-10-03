import {
  handleKeyPressAnimation
} from "./mainPageTransition.js";
import {
  mainAnimateDown
} from "./mainAnimationDown.js";
import {
  setActiveMenuLink
} from "./menu.js";
import {
  setBodyBgClass
} from "./mainPageTransition.js";


const menuLinks = document.querySelectorAll('.js-nav__link');
const sectionsWrap = document.querySelector('.main');
sectionsWrap.children[0].classList.add('top-section');
const allProjects = document.querySelectorAll('.js-project');
const closeHelloBtn = document.querySelector('.js-project-close-btn-h');
const allProjectsOverlay = document.querySelectorAll('.project');
const paths = document.querySelectorAll('#project-overlay-svg path');

allProjects.forEach(project => {
  project.addEventListener('click', goToTheProject);
});
closeHelloBtn.addEventListener('click', (e) => {
  closeProject();
  const tm = setTimeout(() => {
    mainAnimateDown();
    setBodyBgClass();
    setActiveMenuLink();
    clearTimeout(tm)
  }, 1000)
});



function goToTheProject(e) {
  document.body.style.overflow = 'auto';
  window.removeEventListener('keydown', handleKeyPressAnimation)
  menuLinks.forEach(item => {
    item.classList.remove('nav__link--current')
  })
  let element = e.currentTarget;
  const projectId = element.getAttribute('id')
  document.body.classList.add('project-active')
  const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
  let index = 0;
  const intervalId = setInterval(() => {
    const needIdx = indexes[index];
    paths[needIdx].style.display = 'block';
    index += 1;
    if (indexes.length === index) {
      clearInterval(intervalId)
    }
  }, 30)

  const projectTm = setTimeout(() => {
    document.querySelector('.project-appear').classList.add('project-visible')
    allProjectsOverlay.forEach(project => {
      if (project.classList.contains('current-project')) {
        project.classList.remove('current-project')
      }
      if (project.dataset.projectid === projectId) {
        const btnsArray = [ ...project.querySelectorAll('.prev')];
        btnsArray.forEach(btn => {
          btn.classList.add('js-project-close-btn');
        });
        const closeBtnsArray = [ ...project.querySelectorAll('.prev.js-project-close-btn')];
        closeBtnsArray.forEach(btn => {
          btn.addEventListener('click', closeProject);
        });
        project.querySelector('.transotion-section').classList.add('current-page');
        project.classList.add('current-project');
        window.addEventListener('resize', setSectionWrapHeight(projectId));
        const children = [ ...project.querySelector('.transotion-wrap').children];
        let res =[];
        children.forEach(currentItem => {
          if(currentItem.classList.contains('transotion-section')) {
            res.push(currentItem)
          }
        });
        if(res.length === 1) {
          document.body.classList.add('last-project-page');
          const btns = document.querySelectorAll('.next');
          btns.forEach(btn => {
            btn.style.display = 'none';
          });
        } else {
          const btns = document.querySelectorAll('.next');
          btns.forEach(btn => {
            btn.style.display = 'block';
          });
        }
        setNextBtnText();
      }
    })
    clearTimeout(projectTm)
    setSectionWrapHeight(projectId);
  }, 1000)
}

export function closeProject(e) {
  if (e && e.currentTarget.classList.contains('js-project-close-btn') || !e) {
  document.body.style.overflow = 'hidden';
  document.body.classList.remove('last-project-page');
  window.addEventListener('keydown', handleKeyPressAnimation);
  if (document.querySelector('.project-appear').classList.contains('project-visible')) {
    document.querySelector('.project-appear').classList.remove('project-visible')
  }
  const indexes = [1, 0, 17, 5, 4, 22, 19, 2, 25, 14, 12, 21, 3, 27, 13, 7, 16, 24, 6, 15, 26, 20, 8, 18, 11, 9, 23, 10];
  let index = 0;
  const intervalId = setInterval(() => {
    const needIdx = indexes[index];
    paths[needIdx].style.display = 'none';
    index += 1;
    if (indexes.length === index) {
      clearInterval(intervalId);
    }
  }, 50)
  document.body.style.height = '100%';
  const tm = setTimeout(() => {
    document.body.classList.remove('project-active');
  }, 3000);
  const howLink = document.querySelector('[data-linkid="how"]');
  howLink.classList.add('nav__link--current');
}
  if (e && e.currentTarget.classList.contains('js-project-close-btn') || !e) {
    const tm = setTimeout(() => {
      document.querySelectorAll('.transotion-wrap').forEach(parent => {
        Object.values(parent.children).forEach(child => {
          child.classList.remove('current-page')
        });
        Object.values(parent.children)[2].classList.add('current-page')
       
      })

      clearTimeout(tm)
    }, 1500)
  }
}
// START
function setPrev() {
  const currentProject = document.querySelector('.current-project');
  const currentProjectPage = currentProject.querySelector('.current-page');
  const wrapper = currentProject.querySelector('.transotion-wrap');
  // wrapper.style.height = `${currentProjectPage.offsetHeight}px`;
  // document.body.style.height = `${currentProjectPage.offsetHeight}px`;
}
function setNext() {
  const currentProject = document.querySelector('.current-project');
  const currentProjectPage = currentProject.querySelector('.current-page').nextElementSibling;
  const wrapper = currentProject.querySelector('.transotion-wrap');
  // wrapper.style.height = `${currentProjectPage.offsetHeight}px`;
  // document.body.style.height = `${currentProjectPage.offsetHeight}px`;
}

function setSectionWrapHeight(projectId) {
  const body = document.body;
  allProjectsOverlay.forEach(project => {
    
    if (project.dataset.projectid === projectId) {
      let height = 0;
      const wrapper = project.querySelector('.transotion-wrap');
      Object.values(wrapper.children).forEach(child => {
        if(child.classList.contains('transotion-section')) {
          if (Object.values(Object.values(wrapper.children)).length === 1) {
            document.body.classList.add('last-project-page');
          };
          if(child.classList.contains('current-page')) {
            height = child.querySelector('.wrapper-opacity').clientHeight;
          }
        }
      });
      const currentPage = project.querySelector('.current-page');
      const currentPageWrapper = currentPage.querySelector('.wrapper');
      // currentPageWrapper.style.height = `${height}px`;
      // wrapper.style.height = `${height}px`;
      // body.style.height = `${height}px`;
      body.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
  })
}

const allNextBtns = document.querySelectorAll('.next');
const allPrevBtns = document.querySelectorAll('.prev');
allNextBtns.forEach(btn => {
  btn.addEventListener('click', nextSubPageAnimation);
});
allPrevBtns.forEach(btn => {
  btn.addEventListener('click', prevSubPageAnimation);
});


function nextSubPageAnimation(e) {
  const element = e.currentTarget;
  const allBtns = [ ...document.body.querySelectorAll('.prev')];
  allBtns.forEach(btn => {
    btn.classList.remove('js-project-close-btn');
  });
  const parent = element.closest('.transotion-wrap').querySelector('.transotion-section.current-page');
  if(parent.classList.contains('pt-page-moveToLeftEasing')) {
return;
  }
  setNextBtnText(element);
  parent.nextElementSibling.scrollTo({
    top: 0,
    behavior: "smooth"
});
  if(!parent.nextElementSibling.nextElementSibling) {
    element.style.display = 'none';
  }
  parent.classList.add('pt-page-moveToLeftEasing');
  parent.classList.add('pt-page-ontop');
  const nextSection = parent.nextElementSibling;
  nextSection.classList.add('pt-page-moveFromRight');
  nextSection.classList.add('current-page');
  if (!nextSection.nextElementSibling) {
    document.body.classList.add('last-project-page');
  };
  const timeout = setTimeout(() => {
    parent.classList.remove('pt-page-moveToLeftEasing');
    parent.classList.remove('pt-page-ontop');
    nextSection.classList.remove('pt-page-moveFromRight');
    parent.classList.remove('current-page');
    // document.body.classList.remove('page-transition-animate');
    const projectid = parent.closest('.project').dataset.projectid;
    setSectionWrapHeight(projectid);
    clearTimeout(timeout)
  }, 1000);
  setNext();
}

function prevSubPageAnimation(e) {
  const element = e.currentTarget;
  setNextBtnText(element);
  const parent = element.closest('.transotion-wrap').querySelector('.transotion-section.current-page');
  if(element.closest('.transotion-wrap').querySelector('.pt-page-moveToRightEasing')) {
    return;
  }
  parent.previousElementSibling.scrollTo({
    top: 0,
    behavior: "smooth"
});
  if(document.body.classList.contains('last-project-page') && parent.previousElementSibling.classList.contains('transotion-section')) {
    e.currentTarget.nextElementSibling.style.display = 'block';
  }
  document.body.classList.remove('last-project-page');
  const projectid = parent.closest('.project').dataset.projectid;
  const prevSection = parent.previousElementSibling;
  if(prevSection && !prevSection.classList.contains('transotion-section')) {
    element.classList.add('js-project-close-btn');
};
if(prevSection.classList.contains('transotion-section') && !element.classList.contains('js-project-close-btn')) {
  parent.classList.add('pt-page-moveToRightEasing');
  parent.classList.add('pt-page-ontop');
    prevSection.classList.add('pt-page-moveFromLeft');
    prevSection.classList.add('current-page');
    const timeout = setTimeout(() => {
      parent.classList.remove('pt-page-moveToRightEasing');
      parent.classList.remove('pt-page-ontop');
      prevSection.classList.remove('pt-page-moveFromLeft');
      parent.classList.remove('current-page');
      setSectionWrapHeight(projectid);
      clearTimeout(timeout)
    }, 1000);
    setPrev();
  }
}
function setNextBtnText(element) {
  // console.log(6666);
  if(element && !element.classList.contains('js-project-close-btn')) {
  const children = [...element.closest('.transotion-wrap').children];
   children.forEach(currentItem => {
  if(currentItem.classList.contains('current-page') && element.classList.contains('next')) {
    element.querySelector('.next-btn__span').textContent = currentItem.nextElementSibling.getAttribute('data-btn');
  } else if(currentItem.classList.contains('current-page') && element.classList.contains('prev')) {
    element.nextElementSibling.querySelector('.next-btn__span').textContent = currentItem.previousElementSibling.getAttribute('data-btn');
  }
});
  } else {
    console.log(8888888);
    if(document.body.classList.contains('last-project-page')) {
      return;
    }
    const nextBtns = document.querySelectorAll('button.next');
    nextBtns.forEach(btn => {
      const nextBtnParent = btn.closest('.transotion-wrap');
      const currentSection = nextBtnParent.querySelector('.current-page');
      if(currentSection && currentSection.getAttribute('data-btn')) {
        btn.querySelector('.next-btn__span').textContent = currentSection.getAttribute('data-btn');
      }
    });
  }

}

