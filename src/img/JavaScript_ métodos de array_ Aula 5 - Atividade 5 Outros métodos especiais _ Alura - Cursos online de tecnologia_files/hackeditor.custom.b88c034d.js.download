function setupHackEditor(params = {}) {
    const { toolbarActionsHints, imageUploadClient, imageUploadMessages, imageUploadErrors, allowImageUpload } = params.editorOptions;

    const findElement = document.querySelector.bind(document);

    const toolbar = [
        {
            name: 'title',
            title: toolbarActionsHints.toggleHeadingActionHint,
            action: HackEditor.core.toggleHeadingSmaller,
            className: 'hackeditor-icon icon-title'
        },
        {
            name: 'bold',
            title: toolbarActionsHints.toggleBoldActionHint,
            action: HackEditor.core.toggleBold,
            className: 'hackeditor-icon icon-bold'
        },
        {
            name: 'italic',
            title: toolbarActionsHints.toggleItalicActionHint,
            action: HackEditor.core.toggleItalic,
            className: 'hackeditor-icon icon-italic'
        },
        '|',
        {
            name: 'ordered-list',
            title: toolbarActionsHints.toggleOrderedListActionHint,
            action: HackEditor.core.toggleOrderedList,
            className: 'hackeditor-icon icon-ordered-list'
        },
        {
            name: 'unordered-list',
            title:  toolbarActionsHints.toggleUnorderedListActionHint,
            action: HackEditor.core.toggleUnorderedList,
            className: 'hackeditor-icon icon-unordered-list'
        },
        {
            name: 'table',
            title: toolbarActionsHints.drawTableActionHint,
            action: HackEditor.core.drawTable,
            className: 'hackeditor-icon icon-table'
        },
        {
            name: 'code',
            title: toolbarActionsHints.drawCodeActionHint,
            action: HackEditor.core.toggleCodeBlock,
            className: 'hackeditor-icon icon-code'
        },
        {
            name: 'link',
            title:  toolbarActionsHints.drawLinkActionHint,
            action: HackEditor.core.drawLink,
            className: 'hackeditor-icon icon-link'
        },
        {
            name: 'image',
            title:  toolbarActionsHints.drawImageActionHint,
            action: HackEditor.core.drawImage,
            className: 'hackeditor-icon icon-image'
        },

        // TODO: Esse é um icone temporario, mudar quando tivermos o novo
        {
            name: 'upload-image',
            title:  toolbarActionsHints.drawUploadedImageActionHint,
            action: HackEditor.core.drawUploadedImage,
            className: 'hackeditor-icon icon-upload-image'
        },
        '|',
        {
            name: 'undo',
            title:  toolbarActionsHints.undoActionHint,
            action: HackEditor.core.undo,
            className: 'hackeditor-icon icon-undo'
        },
        {
            name: 'redo',
            title: toolbarActionsHints.redoActionHint,
            action: HackEditor.core.redo,
            className: 'hackeditor-icon icon-redo'
        },
        {
            name: 'preview',
            title: toolbarActionsHints.togglePreviewActionHint,
            action: HackEditor.core.toggleSideBySide,
            className: 'hackeditor-icon icon-preview no-disable'
        },

    ]

    params.extensions.DOMPurify.addHook("uponSanitizeElement", (node, data) => {
        if (data.tagName === "iframe") {
            let src = node.getAttribute("src") || "";
            if (!src.startsWith("https://www.youtube.com/embed/") || !src.startsWith("https://player.vimeo.com/video/")) {
                return node.parentNode.removeChild(node);
            }
        }
    });

    let hasErrorsMessages = false;
    let numberImages = 0;
    let imageList;
    let timeout = 0;

    const debounceImageUpload = function (fn, wait = 5000) {
        return (...args) => {
            if (!timeout) {
                timeout = 1;
                fn.apply(this, args);
                setTimeout(() => {
                    timeout = 0;
                }, wait);
            }
        }
    }

    function getImagesAlert(self) {
        let imagesAlert;
        if (self.element) {
            imagesAlert = self.element.closest(".markdownEditor").previousElementSibling;
        } else {
            imagesAlert = self.closest(".markdownEditor").previousElementSibling;
        }
        return imagesAlert;
    }

    function getListErrors(imagesAlert) {
        return imagesAlert.querySelector('.markdown-list-errors');
    }

    function uploadImageError(self, messageError) {
        const imagesAlert = getImagesAlert(self);
        const listErrors = getListErrors(imagesAlert);

        if (messageError) {
            let itemError = document.createElement('li');
            itemError.classList.add('alert-message');
            let itemMessage = document.createTextNode(messageError);
            itemError.appendChild(itemMessage);

            listErrors.appendChild(itemError);
        }

        imagesAlert.classList.remove('markdown-alert-error-hide');
        imagesAlert.classList.add('markdown-alert-error');
    }

    function cleanErrorMessages(self) {
        const imagesAlert = getImagesAlert(self);
        const listErrors = getListErrors(imagesAlert);

        if (hasErrorsMessages) {
            setTimeout(() => {
                imagesAlert.classList.remove('markdown-alert-error');
                imagesAlert.classList.add('markdown-alert-error-hide');
                listErrors.innerHTML = '';
            }, 5000);

            hasErrorsMessages = false;
        }
    }

    const uploadImage = (image, onSuccess, onError) => {
        numberImages = numberImages + 1;

        imageUploadClient
            .upload(image, progress)
            .then((response) => {
                numberImages = numberImages - 1;
                onSuccess(response.paths[0]);
            })
            .catch((error) => {
                numberImages = numberImages - 1;
                hasErrorsMessages = true;

                let errors = {
                    'file-error': imageUploadErrors.imageFileNotAllowed.replace(/filename/, `"${image.name}"`),
                    'large-file': imageUploadErrors.imageVeryLarge.replace(/filename/, `"${image.name}"`),
                    'malicious-file': imageUploadErrors.imageMaliciousFile.replace(/filename/, `"${image.name}"`)
                }

                onError(errors[error.code] || null);
            }).finally(() => {
            if (numberImages == imageList.length) {
                cleanErrorMessages(this);
            }
        });
    }

    function updateToolbar(toolbar) {
        if (allowImageUpload === 'false') {
            return toolbar.filter((e) => e.name != 'upload-image');
        }
        return toolbar;
    }

    function debounce(callback, timeout = 300) {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback.apply(this, args), timeout);
        }
    }

    function findSubmitElement(counterElement) {
        const formElement = counterElement.closest('form');

        if(formElement) {
            return formElement.querySelector('[type=submit]');
        } else {
            return document.querySelector('[data-submittable=true]');
        }
    }

    function enablePossibleSubmitElement(counterElement) {
        const submitElement = findSubmitElement(counterElement);
        if (submitElement) submitElement.disabled = false;
    }

    function disablePossibleSubmitElement(counterElement) {
        const submitElement = findSubmitElement(counterElement);
        if (submitElement) submitElement.disabled = true;
    }

    function showCounter(textElement, counter, currLength, maxLength) {
        counter.classList.remove('disabled');

        if(currLength > maxLength) {
            counter.classList.add('max-length-reached');
            const maxLengthExceededMessage = textElement.dataset.maxlengthExceededMessage;
            counter.innerHTML = `${currLength}/${maxLength} - ${maxLengthExceededMessage}`;
            disablePossibleSubmitElement(counter);
        } else if(currLength === maxLength) {
            counter.classList.add('max-length-reached');
            const maxLengthReachedMessage = textElement.dataset.maxlengthReachedMessage;
            counter.innerHTML = `${currLength}/${maxLength} - ${maxLengthReachedMessage}`;
            enablePossibleSubmitElement(counter);
        } else {
            counter.classList.remove('max-length-reached');
            counter.innerHTML = `${currLength}/${maxLength}`;
            enablePossibleSubmitElement(counter);
        }
    }

    function hideCounter(counter) {
        counter.classList.add('disabled');
        counter.innerHTML = '';
        enablePossibleSubmitElement(counter);
    }

    function calculateTextLength(text) {
        let textLength = text.length;
        const lineBreakAmount = (text.match(/\n/gm) || []).length;
        return textLength + lineBreakAmount;
    }

    function manipulateCharacterCount(counterElement) {
        const hackEditorWrapper = counterElement.closest('.hackeditor');
        if(!hackEditorWrapper) return;

        const textElement = hackEditorWrapper.querySelector('textarea');

        const textMaxLength = textElement.dataset.maxlength;
        if (!textMaxLength) return;

        const textLength = calculateTextLength(textElement.value);

        const minNotifiableLength = textMaxLength * 0.4;
        const shouldShowCounter = textLength >= minNotifiableLength || window.matchMedia('(max-width: 425px)').matches;

        if(shouldShowCounter) {
            showCounter(textElement, counterElement, textLength, textMaxLength);
        } else {
            hideCounter(counterElement);
        }
    }

    const characterCounter = {
        className: "character-counter",
        defaultValue: null,
        onUpdate: element => debounce(manipulateCharacterCount)(element)
    };

    const defaultEditorOptions = {
        autoDownloadFontAwesome: false,
        syncSideBySidePreviewScroll: true,
        sideBySideFullscreen: false,
        previewClass: ['hackeditor-preview', 'editor-preview'],
        inputStyle: 'contenteditable',
        spellChecker: false,
        toolbar: updateToolbar(toolbar),
        renderingConfig: {
            codeSyntaxHighlighting: true,
            hljs: params.extensions.hljs,
            sanitizerFunction: (content) => {
                const allowTagsConfig = { ADD_TAGS: ['iframe', 'p'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] };
                return params.extensions.DOMPurify.sanitize(content, allowTagsConfig);
            }
        },
        uploadImage: true,
        imageAccept: 'image/png, image/jpg, image/jpeg, image/gif',
        errorCallback: function (errorMessage) {
            uploadImageError(this, errorMessage);
        },
        imageUploadFunction: debounceImageUpload(uploadImage),
        status: ['upload-image', characterCounter],
        // TODO - Remover pra caso o preview fique lado-a-lado, se não vai ficar esquisito prever a imagem nos dois lados.
        previewImagesInEditor: true,
        imageTexts: {
            sbInit: imageUploadMessages.imageUploadMessageInit,
            sbOnDragEnter: imageUploadMessages.imageUploadMessageDragEnter,
            sbOnDrop: imageUploadMessages.imageUploadMessageDrop,
            sbProgress: imageUploadMessages.imageUploadMessageProgress,
            sbOnUploaded: imageUploadMessages.imageUploadMessageUploaded,
            sizeUnits: imageUploadMessages.imageUploadMessageSizeUnits,
        },
        insertTexts: {
            uploadedImage: [imageUploadMessages.imageUploadMessageTag, ' '],
            image: ["![](", ")"],
            link: ["[", "]()"],
        },
        shortcuts: {
            "toggleFullScreen": null,
        }
    }

    const updateOutputField = (editor) => {
        const outputField = editorOptions.element.closest('.hackeditor').querySelector('.hackeditor-sync');
        outputField.value = params.extensions.marked.parse(editor.core.value());
    }

    const editorOptions = { ...defaultEditorOptions ,...params.editorOptions};
    const editor = new HackEditor(editorOptions);

    let progress = new UploadProgress(imageUploadMessages.imageUploadMessageProgress).hackeditor(editor);
    if(params.editorOptions.syncPreview === true) {
        updateOutputField(editor);
        editor.core.codemirror.on('change', () => updateOutputField(editor));
    }

    const inputs = document.querySelectorAll('.imageInput');
    Array.from(inputs).forEach(el => {
        el.addEventListener('change', function (event) {
            imageList = event.target.files;
            progress.build(imageList);
            if (imageList.length > 5) {
                uploadImageError(this, imageUploadErrors.imageErrorLimit);
                event.target.value = '';
                hasErrorsMessages = true;
                cleanErrorMessages(this);
                return;
            }
        });
    });

    return editor;
}