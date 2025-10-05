import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { BlogDto } from '../../_models/blog';
import AOS from 'aos';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  swiper: any;
  isMobileMenuOpen = false;
  latestBlogs: BlogDto[];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.getLatest5Blogs();

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });

    // Initialize Swiper
    this.swiper = new Swiper('.init-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Handle scroll top button
    window.addEventListener('scroll', () => {
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        if (window.scrollY > 100) {
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      }
    });
  }

  ngAfterViewInit() {
    // Remove preloader after view is initialized

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      preloader.remove();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const navmenu = document.querySelector('#navmenu');
    if (navmenu) {
      if (this.isMobileMenuOpen) {
        navmenu.classList.add('mobile-nav-active');
      } else {
        navmenu.classList.remove('mobile-nav-active');
      }
    }
  }

  getLatest5Blogs() {
    this.blogService.getLatest5().subscribe({
      next: (result) => {
        this.latestBlogs = result.data
      }

    });
  }
}
