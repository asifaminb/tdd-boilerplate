//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Kitchen Sink', function () {
  it('.should() - assert that <title> is correct', function () {
    // https://on.cypress.io/visit
    cy.visit('https://example.cypress.io')

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink')
    //   ↲               ↲            ↲
    // subject        chainer      value
  })

  context('Querying', function () {
    beforeEach(function () {
      // Visiting our app before each test removes any state build up from
      // previous tests. Visiting acts as if we closed a tab and opened a fresh one
      cy.visit('https://example.cypress.io/commands/querying')
    })

    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQuery

    it('cy.get() - query DOM elements', function () {
      // https://on.cypress.io/get

      // Get DOM elements by id
      cy.get('#query-btn').should('contain', 'Button')

      // Get DOM elements by class
      cy.get('.query-btn').should('contain', 'Button')

      cy.get('#querying .well>button:first').should('contain', 'Button')
      //              ↲
      // Use CSS selectors just like jQuery
    })

    it('cy.contains() - query DOM elements with matching content', function () {
      // https://on.cypress.io/contains
      cy.get('.query-list')
        .contains('bananas').should('have.class', 'third')

      // we can pass a regexp to `.contains()`
      cy.get('.query-list')
        .contains(/^b\w+/).should('have.class', 'third')

      cy.get('.query-list')
        .contains('apples').should('have.class', 'first')

      // passing a selector to contains will yield the selector containing the text
      cy.get('#querying')
        .contains('ul', 'oranges').should('have.class', 'query-list')

      // `.contains()` will favor input[type='submit'],
      // button, a, and label over deeper elements inside them
      // this will not yield the <span> inside the button,
      // but the <button> itself
      cy.get('.query-button')
        .contains('Save Form').should('have.class', 'btn')
    })

    it('.within() - query DOM elements within a specific element', function () {
      // https://on.cypress.io/within
      cy.get('.query-form').within(function () {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email')
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      })
    })

    it('cy.root() - query the root DOM element', function () {
      // https://on.cypress.io/root
      // By default, root is the document
      cy.root().should('match', 'html')

      cy.get('.query-ul').within(function () {
        // In this within, the root is now the ul DOM element
        cy.root().should('have.class', 'query-ul')
      })
    })
  })

  context('Traversal', function () {
    beforeEach(function () {
      cy.visit('https://example.cypress.io/commands/traversal')
    })

    // Let's query for some DOM elements and make assertions

    it('.children() - get child DOM elements', function () {
      // https://on.cypress.io/children
      cy.get('.traversal-breadcrumb').children('.active')
        .should('contain', 'Data')
    })

    it('.closest() - get closest ancestor DOM element', function () {
      // https://on.cypress.io/closest
      cy.get('.traversal-badge').closest('ul')
        .should('have.class', 'list-group')
    })

    it('.eq() - get a DOM element at a specific index', function () {
      // https://on.cypress.io/eq
      cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')
    })

    it('.filter() - get DOM elements that match the selector', function () {
      // https://on.cypress.io/filter
      cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')
    })

    it('.find() - get descendant DOM elements of the selector', function () {
      // https://on.cypress.io/find
      cy.get('.traversal-pagination').find('li').find('a')
        .should('have.length', 7)
    })

    it('.first() - get first DOM element', function () {
      // https://on.cypress.io/first
      cy.get('.traversal-table td').first().should('contain', '1')
    })

    it('.last() - get last DOM element', function () {
      // https://on.cypress.io/last
      cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')
    })

    it('.next() - get next sibling DOM element', function () {
      // https://on.cypress.io/next
      cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')
    })

    it('.nextAll() - get all next sibling DOM elements', function () {
      // https://on.cypress.io/nextall
      cy.get('.traversal-next-all').contains('oranges')
        .nextAll().should('have.length', 3)
    })

    it('.nextUntil() - get next sibling DOM elements until next el', function () {
      // https://on.cypress.io/nextuntil
      cy.get('#veggies').nextUntil('#nuts').should('have.length', 3)
    })

    it('.not() - remove DOM elements from set of DOM elements', function () {
      // https://on.cypress.io/not
      cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled')
    })

    it('.parent() - get parent DOM element from DOM elements', function () {
      // https://on.cypress.io/parent
      cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus')
    })

    it('.parents() - get parent DOM elements from DOM elements', function () {
      // https://on.cypress.io/parents
      cy.get('.traversal-cite').parents().should('match', 'blockquote')
    })

    it('.parentsUntil() - get parent DOM elements from DOM elements until el', function () {
      // https://on.cypress.io/parentsuntil
      cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav')
        .should('have.length', 2)
    })

    it('.prev() - get previous sibling DOM element', function () {
      // https://on.cypress.io/prev
      cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets')
    })

    it('.prevAll() - get all previous sibling DOM elements', function () {
      // https://on.cypress.io/prevAll
      cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2)
    })

    it('.prevUntil() - get all previous sibling DOM elements until el', function () {
      // https://on.cypress.io/prevUntil
      cy.get('.foods-list').find('#nuts').prevUntil('#veggies')
    })

    it('.siblings() - get all sibling DOM elements', function () {
      // https://on.cypress.io/siblings
      cy.get('.traversal-pills .active').siblings().should('have.length', 2)
    })
  })

  context('Actions', function () {
    beforeEach(function () {
      cy.visit('https://example.cypress.io/commands/actions')
    })

    // Let's perform some actions on DOM elements
    // https://on.cypress.io/interacting-with-elements

    it('.type() - type into a DOM element', function () {
      // https://on.cypress.io/type
      cy.get('.action-email')
        .type('fake@email.com').should('have.value', 'fake@email.com')

        // .type() with special character sequences
        .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
        .type('{del}{selectall}{backspace}')

        // .type() with key modifiers
        .type('{alt}{option}') //these are equivalent
        .type('{ctrl}{control}') //these are equivalent
        .type('{meta}{command}{cmd}') //these are equivalent
        .type('{shift}')

        // Delay each keypress by 0.1 sec
        .type('slow.typing@email.com', { delay: 100 })
        .should('have.value', 'slow.typing@email.com')

      cy.get('.action-disabled')
        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking', { force: true })
        .should('have.value', 'disabled error checking')
    })

    it('.focus() - focus on a DOM element', function () {
      // https://on.cypress.io/focus
      cy.get('.action-focus').focus()
        .should('have.class', 'focus')
        .prev().should('have.attr', 'style', 'color: orange;')
    })

    it('.blur() - blur off a DOM element', function () {
      // https://on.cypress.io/blur
      cy.get('.action-blur').type('I\'m about to blur').blur()
        .should('have.class', 'error')
        .prev().should('have.attr', 'style', 'color: red;')
    })

    it('.clear() - clears an input or textarea element', function () {
      // https://on.cypress.io/clear
      cy.get('.action-clear').type('We are going to clear this text')
        .should('have.value', 'We are going to clear this text')
        .clear()
        .should('have.value', '')
    })

    it('.submit() - submit a form', function () {
      // https://on.cypress.io/submit
      cy.get('.action-form')
        .find('[type="text"]').type('HALFOFF')
      cy.get('.action-form').submit()
        .next().should('contain', 'Your form has been submitted!')
    })

    it('.click() - click on a DOM element', function () {
      // https://on.cypress.io/click
      cy.get('.action-btn').click()

      // You can click on 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------

      // clicking in the center of the element is the default
      cy.get('#action-canvas').click()

      cy.get('#action-canvas').click('topLeft')
      cy.get('#action-canvas').click('top')
      cy.get('#action-canvas').click('topRight')
      cy.get('#action-canvas').click('left')
      cy.get('#action-canvas').click('right')
      cy.get('#action-canvas').click('bottomLeft')
      cy.get('#action-canvas').click('bottom')
      cy.get('#action-canvas').click('bottomRight')

      // .click() accepts an x and y coordinate
      // that controls where the click occurs :)

      cy.get('#action-canvas')
        .click(80, 75) // click 80px on x coord and 75px on y coord
        .click(170, 75)
        .click(80, 165)
        .click(100, 185)
        .click(125, 190)
        .click(150, 185)
        .click(170, 165)

      // click multiple elements by passing multiple: true
      cy.get('.action-labels>.label').click({ multiple: true })

      // Ignore error checking prior to clicking
      // like whether the element is visible, clickable or disabled
      // this button below is covered by another element.
      cy.get('.action-opacity>.btn').click({ force: true })
    })

    it('.dblclick() - double click on a DOM element', function () {
      // Our app has a listener on 'dblclick' event in our 'scripts.js'
      // that hides the div and shows an input on double click

      // https://on.cypress.io/dblclick
      cy.get('.action-div').dblclick().should('not.be.visible')
      cy.get('.action-input-hidden').should('be.visible')
    })

    it('cy.check() - check a checkbox or radio element', function () {
      // By default, .check() will check all
      // matching checkbox or radio elements in succession, one after another

      // https://on.cypress.io/check
      cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
        .check().should('be.checked')

      cy.get('.action-radios [type="radio"]').not('[disabled]')
        .check().should('be.checked')

      // .check() accepts a value argument
      // that checks only checkboxes or radios
      // with matching values
      cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked')

      // .check() accepts an array of values
      // that checks only checkboxes or radios
      // with matching values
      cy.get('.action-multiple-checkboxes [type="checkbox"]')
        .check(['checkbox1', 'checkbox2']).should('be.checked')

      // Ignore error checking prior to checking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-checkboxes [disabled]')
        .check({ force: true }).should('be.checked')

      cy.get('.action-radios [type="radio"]')
        .check('radio3', { force: true }).should('be.checked')
    })

    it('.uncheck() - uncheck a checkbox element', function () {
      // By default, .uncheck() will uncheck all matching
      // checkbox elements in succession, one after another

      // https://on.cypress.io/uncheck
      cy.get('.action-check [type="checkbox"]')
        .not('[disabled]')
        .uncheck().should('not.be.checked')

      // .uncheck() accepts a value argument
      // that unchecks only checkboxes
      // with matching values
      cy.get('.action-check [type="checkbox"]')
        .check('checkbox1')
        .uncheck('checkbox1').should('not.be.checked')

      // .uncheck() accepts an array of values
      // that unchecks only checkboxes or radios
      // with matching values
      cy.get('.action-check [type="checkbox"]')
        .check(['checkbox1', 'checkbox3'])
        .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')

      // Ignore error checking prior to unchecking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-check [disabled]')
        .uncheck({ force: true }).should('not.be.checked')
    })

    it('.select() - select an option in a <select> element', function () {
      // https://on.cypress.io/select

      // Select option with matching text content
      cy.get('.action-select').select('apples')

      // Select option with matching value
      cy.get('.action-select').select('fr-bananas')

      // Select options with matching text content
      cy.get('.action-select-multiple')
        .select(['apples', 'oranges', 'bananas'])

      // Select options with matching values
      cy.get('.action-select-multiple')
        .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
    })

    it('.scrollIntoView() - scroll an element into view', function () {
      // https://on.cypress.io/scrollintoview

      // normally all of these buttons are hidden, because they're not within
      // the viewable area of their parent (we need to scroll to see them)
      cy.get('#scroll-horizontal button')
        .should('not.be.visible')

      // scroll the button into view, as if the user had scrolled
      cy.get('#scroll-horizontal button').scrollIntoView()
        .should('be.visible')

      cy.get('#scroll-vertical button')
        .should('not.be.visible')

      // Cypress handles the scroll direction needed
      cy.get('#scroll-vertical button').scrollIntoView()
        .should('be.visible')

      cy.get('#scroll-both button')
        .should('not.be.visible')

      // Cypress knows to scroll to the right and down
      cy.get('#scroll-both button').scrollIntoView()
        .should('be.visible')
    })

    it('cy.scrollTo() - scroll the window or element to a position', function () {

      // https://on.cypress.io/scrollTo

      // You can scroll to 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------

      // if you chain .scrollTo() off of cy, we will
      // scroll the entire window
      cy.scrollTo('bottom')

      cy.get('#scrollable-horizontal').scrollTo('right')

      // or you can scroll to a specific coordinate:
      // (x axis, y axis) in pixels
      cy.get('#scrollable-vertical').scrollTo(250, 250)

      // or you can scroll to a specific percentage
      // of the (width, height) of the element
      cy.get('#scrollable-both').scrollTo('75%', '25%')

      // control the easing of the scroll (default is 'swing')
      cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

      // control the duration of the scroll (in ms)
      cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
    })

    it('.trigger() - trigger an event on a DOM element', function () {
      // To interact with a range input (slider), we need to set its value and
      // then trigger the appropriate event to signal it has changed

      // Here, we invoke jQuery's val() method to set the value
      // and trigger the 'change' event

      // Note that some implementations may rely on the 'input' event,
      // which is fired as a user moves the slider, but is not supported
      // by some browsers

      // https://on.cypress.io/trigger
      cy.get('.trigger-input-range')
        .invoke('val', 25)
        .trigger('change')
        .get('input[type=range]').siblings('p')
        .should('have.text', '25')

      // See our example recipes for more examples of using trigger
      // https://on.cypress.io/examples
    })
  })

  context('Window', function () {
    beforeEach(function () {
      cy.visit('https://example.cypress.io/commands/window')
    })

    it('cy.window() - get the global window object', function () {
      // https://on.cypress.io/window
      cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', function () {
      // https://on.cypress.io/document
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', function () {
      // https://on.cypress.io/title
      cy.title().should('include', 'Kitchen Sink')
    })
  })


})
